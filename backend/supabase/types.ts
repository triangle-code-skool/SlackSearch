export type Platform = "LinkedIn" | "Instagram" | "Twitter" | "Facebook" | "GitHub" | "Other";

export type MatchConfidence = "HIGH" | "MEDIUM" | "LOW";

export interface SocialMatch {
    platform: Platform;
    url: string;
    match_confidence: MatchConfidence;
    evidence?: string;
}

export interface SeedIdentity {
    real_name: string;
    display_name?: string;
    email?: string;
    phone?: string;
    tz_label?: string;
}

export interface OSINTEnrichment {
    google_search_query?: string;
    social_matches?: SocialMatch[];
}

export interface Meta {
    processed_at?: string;
    crawler_version?: string;
    calculated_likelihood_score?: number;
}

export interface SlackOSINTProfile {
    slack_id: string;
    seed_identity: SeedIdentity;
    osint_enrichment?: OSINTEnrichment;
    meta: Meta;
}

export type SlackOSINTProfileList = SlackOSINTProfile[];