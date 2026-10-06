// Safe wrapper around @vercel/kv.
// Falls back to an in-memory store when KV_REST_API_URL / KV_REST_API_TOKEN
// are not configured, so local development and preview environments keep
// working without real Vercel KV credentials.
import { kv as vercelKv } from "@vercel/kv";

const memoryStore = new Map<string, unknown>();
const memoryLists = new Map<string, unknown[]>();

const hasKvConfig = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

export const kvStore = {
  async get<T>(key: string): Promise<T | null> {
    if (hasKvConfig) {
      return (await vercelKv.get<T>(key)) ?? null;
    }
    return (memoryStore.get(key) as T) ?? null;
  },
  async set(key: string, value: unknown): Promise<void> {
    if (hasKvConfig) {
      await vercelKv.set(key, value as never);
      return;
    }
    memoryStore.set(key, value);
  },
  async lpush(key: string, value: unknown): Promise<void> {
    if (hasKvConfig) {
      await vercelKv.lpush(key, value as never);
      return;
    }
    const list = memoryLists.get(key) ?? [];
    list.unshift(value);
    memoryLists.set(key, list);
  },
  async lrange<T>(key: string, start: number, stop: number): Promise<T[]> {
    if (hasKvConfig) {
      return (await vercelKv.lrange<T>(key, start, stop)) ?? [];
    }
    const list = (memoryLists.get(key) ?? []) as T[];
    const end = stop === -1 ? list.length : stop + 1;
    return list.slice(start, end);
  },
  isLive: hasKvConfig,
};
