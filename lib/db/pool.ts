import type { Pool, PoolConfig } from "pg";

let cached: Pool | null = null;

/**
 * Shared Postgres pool. Handles AWS RDS's self-signed cert chain automatically
 * (TLS stays on, chain verification off for *.rds.amazonaws.com hosts).
 * Returns null when DATABASE_URL is unset so callers can fall back.
 */
export async function getPool(): Promise<Pool | null> {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) return null;

  const { Pool } = await import("pg");
  const isRds = /\.rds\.amazonaws\.com/.test(url);

  // pg's connection-string parser promotes any `sslmode=require` to
  // verify-full, which rejects RDS's cert chain. Strip it so our explicit
  // ssl option below takes effect.
  const cleanedUrl = isRds ? url.replace(/([?&])sslmode=[^&]*&?/g, "$1").replace(/[?&]$/, "") : url;

  const config: PoolConfig = { connectionString: cleanedUrl };
  if (isRds) {
    config.ssl = { rejectUnauthorized: false };
  }
  cached = new Pool(config);
  return cached;
}
