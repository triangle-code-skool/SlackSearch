import { createClient } from 'npm:@supabase/supabase-js@2'
import { SlackOSINTProfile, SlackOSINTProfileList } from '../../types.ts'

const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*' } })
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
    }

    try {
        const body: SlackOSINTProfileList = await req.json()
        
        if (!Array.isArray(body)) {
            return new Response(JSON.stringify({ error: 'Request body must be an array' }), { status: 400 })
        }

        const results = await Promise.all(
            body.map(async (profile) => {
                try {
                    const result = await pushData(profile)
                    return { slack_id: profile.slack_id, success: true, data: result }
                } catch (error) {
                    return { slack_id: profile.slack_id, success: false, error: error instanceof Error ? error.message : 'Unknown error' }
                }
            })
        )

        return new Response(
            JSON.stringify({ success: true, processed: results.length, results }),
            { status: 200, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Invalid request format', details: error instanceof Error ? error.message : 'Unknown error' }),
            { status: 400 }
        )
    }
})

//Pushes a single row to the slack_profiles table
async function pushData(profile: SlackOSINTProfile) {
    if (!profile.slack_id || !profile.seed_identity || !profile.meta) {
        throw new Error('Missing required fields')
    }

    const { data, error } = await supabase
        .from('slack_profiles')
        .upsert({
            slack_id: profile.slack_id,
            seed_identity: profile.seed_identity,
            osint_enrichment: profile.osint_enrichment || null,
            meta: profile.meta,
        }, { onConflict: 'slack_id' })
        .select()
    
    if (error) throw new Error(error.message)
    return data?.[0]
}