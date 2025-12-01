CREATE TABLE IF NOT EXISTS slack_profiles(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slack_id TEXT NOT NULL UNIQUE,
    seed_identity JSONB NOT NULL,
    osint_enrichment JSONB,
    meta JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);