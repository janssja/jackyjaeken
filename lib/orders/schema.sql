CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  mollie_payment_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  customer_json TEXT NOT NULL,
  lines_json TEXT NOT NULL,
  fulfillment_json TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_mollie ON orders (mollie_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_token ON orders (token);
