import Database from "better-sqlite3";
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { env } from "@/lib/env";

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;
  const dbPath = path.resolve(process.cwd(), env.DATABASE_URL);
  mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  const schema = readFileSync(
    path.resolve(process.cwd(), "lib/orders/schema.sql"),
    "utf-8"
  );
  db.exec(schema);
  return db;
}

export type OrderStatus = "pending" | "paid" | "failed" | "expired" | "canceled";

export type OrderRow = {
  id: string;
  token: string;
  mollie_payment_id: string | null;
  status: OrderStatus;
  amount_cents: number;
  currency: string;
  customer_json: string;
  lines_json: string;
  fulfillment_json: string;
  created_at: number;
  updated_at: number;
};

export function randomId(prefix = "ord"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function createOrder(args: {
  amountCents: number;
  customer: unknown;
  lines: unknown;
  fulfillment: unknown;
}): OrderRow {
  const now = Date.now();
  const row: OrderRow = {
    id: randomId("ord"),
    token: randomId("tok"),
    mollie_payment_id: null,
    status: "pending",
    amount_cents: args.amountCents,
    currency: "EUR",
    customer_json: JSON.stringify(args.customer),
    lines_json: JSON.stringify(args.lines),
    fulfillment_json: JSON.stringify(args.fulfillment),
    created_at: now,
    updated_at: now,
  };
  getDb()
    .prepare(
      `INSERT INTO orders (id, token, mollie_payment_id, status, amount_cents, currency, customer_json, lines_json, fulfillment_json, created_at, updated_at)
       VALUES (@id, @token, @mollie_payment_id, @status, @amount_cents, @currency, @customer_json, @lines_json, @fulfillment_json, @created_at, @updated_at)`
    )
    .run(row);
  return row;
}

export function attachMolliePayment(orderId: string, molliePaymentId: string): void {
  getDb()
    .prepare(
      `UPDATE orders SET mollie_payment_id = ?, updated_at = ? WHERE id = ?`
    )
    .run(molliePaymentId, Date.now(), orderId);
}

export function updateStatus(molliePaymentId: string, status: OrderStatus): void {
  getDb()
    .prepare(
      `UPDATE orders SET status = ?, updated_at = ? WHERE mollie_payment_id = ?`
    )
    .run(status, Date.now(), molliePaymentId);
}

export function findOrderByToken(token: string): OrderRow | undefined {
  return getDb()
    .prepare(`SELECT * FROM orders WHERE token = ?`)
    .get(token) as OrderRow | undefined;
}

export function findOrderByMollieId(molliePaymentId: string): OrderRow | undefined {
  return getDb()
    .prepare(`SELECT * FROM orders WHERE mollie_payment_id = ?`)
    .get(molliePaymentId) as OrderRow | undefined;
}

export function findOrderById(id: string): OrderRow | undefined {
  return getDb()
    .prepare(`SELECT * FROM orders WHERE id = ?`)
    .get(id) as OrderRow | undefined;
}
