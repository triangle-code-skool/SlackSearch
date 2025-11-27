import { SlackOSINTProfile } from '../types'

/*
 * Test with
 * npx tsx supabase/functions/test_ingestion.ts
 */

// Test profile
const testProfile: SlackOSINTProfile = {
    slack_id: "U_TEST_123",
    seed_identity: {
        real_name: "Test User",
        display_name: "TestUser",
        email: "test@example.com",
        phone: "+1-555-0000",
        tz_label: "America/New_York"
    },
    osint_enrichment: {
        google_search_query: "test query",
        social_matches: [
            {
                platform: "LinkedIn",
                url: "https://linkedin.com/in/test",
                match_confidence: "HIGH",
                evidence: "Test evidence"
            }
        ]
    },
    meta: {
        processed_at: new Date().toISOString(),
        crawler_version: "v1.0",
        calculated_likelihood_score: 75.5
    }
}

// Run test
async function test() {
    console.log('Testing deployed Edge Function...')
    
    // Replace with your actual anon key from Supabase Dashboard
    const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmaGZjam16ZWh4bmh5eWdpZHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMTE1OTcsImV4cCI6MjA3OTc4NzU5N30.Hu1oGe_cXozz0vMxcWgrWWPz2v9tgi_3xDykaNeLRZw'
    const ENDPOINT = 'https://ufhfcjmzehxnhyygidta.supabase.co/functions/v1/data_ingestion'
    
    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([testProfile]) // Send as array
        })
        
        const result = await response.json()
        
        if (response.ok) {
            console.log('✅ Success!', result)
        } else {
            console.error('❌ Error:', result)
        }
    } catch (error) {
        console.error('❌ Error:', error instanceof Error ? error.message : error)
    }
}

test()