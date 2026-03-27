-- Creates the table used by the admin portal and API to store pending/approved/rejected entries.
-- It replaces the old `public.stringers` table and keeps the same column structure, plus the
-- `status` and `admin_notes` fields that track moderation decisions.

CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  pricing TEXT,
  country_id TEXT,
  area_id TEXT,
  sports TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  contact JSONB NOT NULL DEFAULT '{}'::JSONB,
  visibility TEXT NOT NULL DEFAULT 'active'::TEXT,
  sort_id INTEGER NOT NULL DEFAULT 999,
  status TEXT NOT NULL DEFAULT 'pending'::TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT submissions_pkey PRIMARY KEY (id),
  CONSTRAINT submissions_slug_key UNIQUE (slug),
  CONSTRAINT submissions_visibility_check CHECK (
    visibility = ANY (
      ARRAY['active'::TEXT, 'offline'::TEXT]
    )
  ),
  CONSTRAINT submissions_status_check CHECK (
    status = ANY (
      ARRAY['pending'::TEXT, 'approved'::TEXT, 'rejected'::TEXT]
    )
  )
) TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS idx_submissions_area_sort
  ON public.submissions USING btree (area_id, sort_id)
  TABLESPACE pg_default;

