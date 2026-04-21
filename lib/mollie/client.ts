import createMollieClient, { MollieClient } from "@mollie/api-client";
import { env, mollieConfigured } from "@/lib/env";

let client: MollieClient | null = null;

export function getMollie(): MollieClient | null {
  if (!mollieConfigured || !env.MOLLIE_API_KEY) return null;
  if (!client) {
    client = createMollieClient({ apiKey: env.MOLLIE_API_KEY });
  }
  return client;
}

export { mollieConfigured };
