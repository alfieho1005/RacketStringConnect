-- discovery_queue: holds AI-discovered stringer/pickleball candidates pending owner review
-- discovery_runs: tracks each weekly fetcher execution

CREATE TABLE IF NOT EXISTS public.discovery_queue (
  id           UUID        NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  record_type  TEXT        NOT NULL DEFAULT 'stringer',
  name         TEXT        NOT NULL,
  description  TEXT,
  sports       TEXT[]      NOT NULL DEFAULT '{}',
  country_id   TEXT,
  city_hint    TEXT,
  area_id      TEXT,
  pricing      TEXT,
  contact      JSONB       NOT NULL DEFAULT '{}',
  source_url   TEXT,
  query_used   TEXT,
  run_id       TEXT,
  confidence   TEXT        NOT NULL DEFAULT 'low',
  status       TEXT        NOT NULL DEFAULT 'pending',
  admin_notes  TEXT,
  raw_snippets JSONB,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  reviewed_at  TIMESTAMPTZ,
  CONSTRAINT dq_record_type_check CHECK (
    record_type = ANY(ARRAY['stringer','pickleball-shop','pickleball-court'])),
  CONSTRAINT dq_status_check CHECK (
    status = ANY(ARRAY['pending','approved','rejected','duplicate'])),
  CONSTRAINT dq_confidence_check CHECK (
    confidence = ANY(ARRAY['high','low']))
);

CREATE INDEX IF NOT EXISTS idx_dq_status     ON public.discovery_queue(status);
CREATE INDEX IF NOT EXISTS idx_dq_run_id     ON public.discovery_queue(run_id);
CREATE INDEX IF NOT EXISTS idx_dq_country    ON public.discovery_queue(country_id);
CREATE INDEX IF NOT EXISTS idx_dq_created_at ON public.discovery_queue(created_at DESC);

CREATE TABLE IF NOT EXISTS public.discovery_runs (
  id               TEXT        NOT NULL PRIMARY KEY,
  started_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at      TIMESTAMPTZ,
  queries_run      INTEGER     NOT NULL DEFAULT 0,
  candidates_found INTEGER     NOT NULL DEFAULT 0,
  errors           JSONB       NOT NULL DEFAULT '[]',
  status           TEXT        NOT NULL DEFAULT 'running',
  CONSTRAINT dr_status_check CHECK (
    status = ANY(ARRAY['running','completed','failed']))
);
