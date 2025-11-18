# SlackSearch
Mini-project consisting of ingesting Slack user identities to trigger off an OSINT crawler, piping the packaged JSON to a Supabase endpoint. We cache and query records to then interface the database to create a sleek UI providing likelihoods of same users existing elsewhere on the web.

## Repository Structure
This repository is divided into three distinct domains. Please work only within your assigned directory unless coordinating integration.

```
/project-root
│
├── /ingestor (Kellen)
│   ├── /src                 # Python/Node scripts for Slack API 
│   ├── /output              # Local storage for raw JSON dumps (GitIgnored)
│   └── Dockerfile           # Environment setup 
│
├── /backend (Aadi)
│   ├── /supabase
│   │   ├── /functions       # Edge Functions for data ingestion and scoring logic
│   │   └── /migrations      # SQL Schema definitions
│   └── types.ts             # TypeScript definitions matching schema.json
│
├── /web-client (Dilworth)
│   ├── /src
│   │   ├── /components      # React components (MatchCard, Dashboard)
│   │   └── /pages           # Next.js App Router pages
│   ├── package.json
│   └── tailwind.config.js
│
├── schema.json              
├── dummy_data.json
└── README.md
```

## The Data Pipeline
1. Ingestor fetches Slack User List -> Runs OSINT -> Outputs JSON matching schema.json.
2. Ingestor POSTs JSON to Backend API Endpoint.
3. Backend validates JSON -> Stores in Database -> Updates Likelihood Score.
4. Web Client queries Backend to display high-probability matches.

## Development Workflow
Direct pushes to main are **blocked.**

1. Pull Latest: Always git pull origin main before starting.
2. Branch: Create a feature branch: git checkout -b feature/your-name-task.
3. Commit: Work in your folder (/ingestor, /backend, or /web-client).
4. Pull Request: Push your branch and open a PR on GitHub.
5. Review: Another team member must review your code before it can merge.
