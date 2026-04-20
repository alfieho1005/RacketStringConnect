-- Phase 1 migration: add has_certified_stringers so the DB matches the Stringer
-- TypeScript type (previously only lived in the in-memory seed).

ALTER TABLE public.submissions
  ADD COLUMN IF NOT EXISTS has_certified_stringers BOOLEAN NOT NULL DEFAULT FALSE;
