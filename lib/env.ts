import { z } from "zod";

const serverSchema = z.object({
  MOLLIE_API_KEY: z.string().optional(),
  SANITY_API_TOKEN: z.string().optional(),
  PUBLIC_WEBHOOK_URL: z.string().optional(),
  DATABASE_URL: z.string().default("./data/orders.db"),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default("production"),
});

const _serverEnv = serverSchema.safeParse(process.env);
const _clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

export const env = {
  ..._serverEnv.success ? _serverEnv.data : serverSchema.parse({}),
  ..._clientEnv.success ? _clientEnv.data : clientSchema.parse({}),
};

export const sanityConfigured = Boolean(env.NEXT_PUBLIC_SANITY_PROJECT_ID);
export const mollieConfigured = Boolean(env.MOLLIE_API_KEY);
