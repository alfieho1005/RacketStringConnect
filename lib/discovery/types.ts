export type RecordType = "stringer" | "pickleball-shop" | "pickleball-court";
export type DiscoveryStatus = "pending" | "approved" | "rejected" | "duplicate";
export type Confidence = "high" | "low";
export type RunStatus = "running" | "completed" | "failed";

export interface DiscoveryQueueRow {
  id: string;
  record_type: RecordType;
  name: string;
  description: string | null;
  sports: string[];
  country_id: string | null;
  city_hint: string | null;
  area_id: string | null;
  pricing: string | null;
  contact: Record<string, string>;
  source_url: string | null;
  query_used: string | null;
  run_id: string | null;
  confidence: Confidence;
  status: DiscoveryStatus;
  admin_notes: string | null;
  raw_snippets: unknown;
  created_at: string;
  reviewed_at: string | null;
}

export interface DiscoveryRunRow {
  id: string;
  started_at: string;
  finished_at: string | null;
  queries_run: number;
  candidates_found: number;
  errors: unknown[];
  status: RunStatus;
}
