# app/db/seeds/projects.py
from app.models.project import Project
from sqlalchemy.orm import Session

def seed_projects(db: Session) -> None:
    projects = [
        {
            "id": 1,
            "slug": "scenic",
            "title": "Scenic",
            "short_description": "A smart navigation app that finds beautiful routes for your road trips, integrating scenic points of interest while keeping your journey time-efficient.",
            "long_description": "A modern navigation application that revolutionizes road trip planning by intelligently incorporating scenic routes and points of interest without significantly impacting journey time.",
            "tech_stack": {
                "Frontend": ["React", "Google Maps JavaScript API", "Tailwind CSS"],
                "Backend": ["Python", "FastAPI", "Uvicorn"],
                "Database": ["PostgreSQL"],
                "DevOps": ["Conda", "Git"]
            },
            "features": [
                {
                    "title": "Multi-stop Navigation",
                    "description": "Support for up to 5 waypoints with intelligent scenic route calculation between each stop.",
                    "icon": "Navigation"
                },
                {
                    "title": "Interactive POI System",
                    "description": "Dynamic points of interest display with detailed modal views and map markers for scenic locations.",
                    "icon": "Map"
                },
                {
                    "title": "Customizable Time Range",
                    "description": "User-defined acceptable time increase (10-75%) for scenic detours with real-time route updates.",
                    "icon": "Clock"
                }
            ],
            "image_url": "/images/scenic_pic.png",
            "icon_url": "/images/compass.svg",
            "github_url": "https://github.com/vadimcastro/scenic",
            "technical_implementation": {
                "systemArchitecture": [
                    "The system utilizes a dual-engine approach to route calculation. The primary engine handles standard point-to-point navigation using the Google Maps Directions API, while a secondary 'Scenic Discovery' engine processes POI data from a custom-indexed PostgreSQL database.",
                    "Route optimization is performed asynchronously via a Python-based worker that evaluates potential detours against user-defined time constraints, ensuring that scenic additions never exceed a specific percentage of the original ETA."
                ],
                "algorithm": {
                    "description": "Our proprietary Scenic-Detour-Optimizer (SDO) selects high-value POIs along a corridor surrounding the optimal route.",
                    "steps": [
                        "Generate a baseline optimal route using the A* algorithm variant.",
                        "Construct a search corridor (buffer) with a radius based on the user's available detour time.",
                        "Score nearby POIs based on scenic ratings, category preferences, and detour overhead.",
                        "Iteratively insert high-scoring waypoints into the route while verifying time constraints."
                    ]
                }
            },
            "status": "concept"
        },
        {
            "id": 2,
            "slug": "dlm",
            "title": "DLM Photo Gallery",
            "short_description": "A high-performance personal photo gallery with Google Photos API integration, masonry layouts, and production-ready Docker infrastructure.",
            "long_description": "DLM Photo Gallery v2 combines custom photography management with seamless Google Photos OAuth2 integration. Built with Next.js 14 and FastAPI, it features dynamic masonry layouts, category filtering, fullscreen touch-optimized lightbox views, and image caching.",
            "tech_stack": {
                "Frontend": ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
                "Backend": ["FastAPI", "Python", "SQLAlchemy", "Alembic"],
                "Integrations": ["Google Photos OAuth2 API", "JWT Auth"],
                "Infrastructure": ["PostgreSQL", "Redis", "Docker Compose"]
            },
            "features": [
                {
                    "title": "Google Photos Integration",
                    "description": "OAuth2 authentication flow with automatic album synchronization and categorization.",
                    "icon": "Image"
                },
                {
                    "title": "Responsive Masonry Gallery",
                    "description": "Touch-optimized, fluid masonry grid with interactive lightbox and category filtering.",
                    "icon": "Layout"
                },
                {
                    "title": "Performance & Caching",
                    "description": "Redis-backed image metadata caching, lazy loading, and resilient API retry logic.",
                    "icon": "Zap"
                }
            ],
            "image_url": "/images/dlm_pic.jpg",
            "icon_url": "/images/browser.svg",
            "github_url": "https://github.com/vadimcastro/DLM-Photo-Gallery",
            "technical_implementation": {
                "systemArchitecture": [
                    "Full-stack photography platform with Next.js 14 frontend and FastAPI REST backend.",
                    "Integrates Google Photos OAuth2 workflow with server-side token management and Redis metadata caching."
                ]
            },
            "status": "active"
        },
        {
            "id": 3,
            "slug": "vadimcastro-me",
            "title": "vadimcastro.com",
            "short_description": "A modern, high-performance developer portfolio and live infrastructure telemetry dashboard.",
            "long_description": "A sophisticated portfolio platform built with Next.js 16 (App Router), React 19, and FastAPI. Features real-time infrastructure monitoring, engagement tracking, and a fluid responsive design system.",
            "tech_stack": {
                "Frontend": ["Next.js 16", "React 19", "Tailwind CSS v4", "Lucide React"],
                "Backend": ["FastAPI", "SQLAlchemy 2", "Pydantic v2"],
                "Infrastructure": ["Docker", "PostgreSQL", "Redis"]
            },
            "features": [
                {
                    "title": "Infrastructure Dashboard",
                    "description": "Real-time CPU, Memory, and Disk monitoring with detailed modal views.",
                    "icon": "Activity"
                },
                {
                    "title": "Engagement Analytics",
                    "description": "Advanced interaction tracking for projects, resume views, and social links.",
                    "icon": "BarChart3"
                },
                {
                    "title": "Pydantic Modernization",
                    "description": "Full migration to Pydantic 2.0+ ensuring high-performance data validation and type safety.",
                    "icon": "Zap"
                }
            ],
            "image_url": "/images/portfolio_pic.png",
            "icon_url": "/images/image-generator.png",
            "github_url": "https://github.com/vadimcastro/vadimcastro.com",
            "technical_implementation": {
                "systemArchitecture": [
                    "The platform is engineered as a modular system ensuring strict separation between FastAPI backend services and Next.js 16 frontend.",
                    "Infrastructure health and engagement analytics are powered by a robust data layer consisting of PostgreSQL for persistent storage and Redis for metric caching."
                ]
            },
            "status": "active"
        },
        {
            "id": 4,
            "slug": "fulldock",
            "title": "FullDock",
            "short_description": "A battle-tested, security-hardened full-stack starter engine featuring Next.js 16, React 19, FastAPI, PostgreSQL, and Docker.",
            "long_description": "FullDock is an open-source, production-ready template for enterprise and developer applications. Includes automated secret scanning (gitleaks), JWT access/refresh token rotation with session revocation, Google/GitHub OAuth integrations, and one-command Docker deployment pipelines.",
            "tech_stack": {
                "Frontend": ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4"],
                "Backend": ["FastAPI", "SQLAlchemy 2", "Pydantic v2", "Alembic"],
                "Security & Auth": ["JWT Token Rotation", "OAuth2 (Google/GitHub)", "Gitleaks CI"],
                "Services": ["PostgreSQL", "Redis", "Docker Compose"]
            },
            "features": [
                {
                    "title": "Security Defaults",
                    "description": "CI/CD security pipeline with gitleaks secret scanning, login rate throttling, and cookie-based HTTPS session revocation.",
                    "icon": "ShieldCheck"
                },
                {
                    "title": "Unified Social OAuth",
                    "description": "Built-in Google and GitHub authentication flows with unified profile state synchronization.",
                    "icon": "Key"
                },
                {
                    "title": "One-Command Operations",
                    "description": "Comprehensive Makefile tooling for local dev, database migrations, and production HTTPS compose deployments.",
                    "icon": "Terminal"
                }
            ],
            "image_url": "/images/fulldock_pic.jpg",
            "icon_url": "/images/browser.svg",
            "github_url": "https://github.com/vadimcastro/FullDock",
            "technical_implementation": {
                "systemArchitecture": [
                    "Modular infrastructure template leveraging Next.js 16 App Router and FastAPI backend with Pydantic v2 schema validation.",
                    "Configured with automated GitHub Actions security audit workflows and production HTTPS Docker Compose setups."
                ]
            },
            "status": "active"
        },
        {
            "id": 5,
            "slug": "soundfox",
            "title": "SoundFox",
            "short_description": "A local-first browser extension for Chrome and Firefox that stabilizes, equalizes, and boosts streaming audio up to 600%.",
            "long_description": "SoundFox is a lightweight WebAudio extension built with Vite and TypeScript. It features a customizable 5-band equalizer, 600% volume boosting, dynamic voice clarity (Dialog Mode), scene volume leveling (Level Mode), and per-tab/per-domain memory settings with custom hotkeys.",
            "tech_stack": {
                "Extension Core": ["TypeScript", "Vite", "WebExtension Manifest V3", "webextension-polyfill"],
                "Audio Engine": ["WebAudio API", "BiquadFilterNode", "DynamicsCompressorNode", "GainNode"],
                "CI/CD": ["GitHub Actions Automated Extension Build"]
            },
            "features": [
                {
                    "title": "600% Boost & 5-Band EQ",
                    "description": "Precision volume amplification coupled with persistent 5-band frequency tuning.",
                    "icon": "Sliders"
                },
                {
                    "title": "Dialog & Leveling Modes",
                    "description": "Real-time vocal enhancement for speech clarity and dynamic range compression for scene loudness smoothing.",
                    "icon": "Volume2"
                },
                {
                    "title": "Cross-Browser & Hotkeys",
                    "description": "Compatible with Chrome and Firefox, supporting customizable keyboard shortcuts for instant audio control.",
                    "icon": "Command"
                }
            ],
            "image_url": "/images/soundfox_pic.jpg",
            "icon_url": "/images/browser.svg",
            "github_url": "https://github.com/vadimcastro/SoundFox",
            "technical_implementation": {
                "systemArchitecture": [
                    "Client-side WebAudio processing graph (GainNode -> BiquadFilterNodes -> DynamicsCompressorNode).",
                    "Manifest V3 compliant background worker and popup state management using webextension-polyfill."
                ]
            },
            "status": "active"
        },
        {
            "id": 6,
            "slug": "spacetimedc",
            "title": "SpacetimeDC",
            "short_description": "A real-time data-center virtual power plant (VPP) simulation and grid regulation settlement engine built on SpacetimeDB and Rust.",
            "long_description": "SpacetimeDC models megawatt-scale AI campuses in Northern Virginia (PJM zone) operating as dispatchable grid assets. The system responds to grid frequency stress using battery discharge and IT load curtailment, logging cleared response events into an immutable on-chain settlement ledger.",
            "tech_stack": {
                "Backend & Engine": ["SpacetimeDB", "Rust", "WebSockets"],
                "Frontend": ["Vite", "React", "TypeScript", "Bun"],
                "Simulator": ["Bun Fleet Simulator", "PJM RegD Grid Signal Model"]
            },
            "features": [
                {
                    "title": "Unified Shared State",
                    "description": "SpacetimeDB multi-client subscriptions sync backend dispatchers, simulator fleets, and frontend UI in real-time.",
                    "icon": "Cpu"
                },
                {
                    "title": "Dual Regulation Response",
                    "description": "Automated power dispatch combining fast battery discharge (primary) and flexible compute curtailment (secondary).",
                    "icon": "Zap"
                },
                {
                    "title": "Auditable Settlement Ledger",
                    "description": "Every cleared 2-second response tick creates an immutable ledger row calculating wholesale market payouts.",
                    "icon": "FileText"
                }
            ],
            "image_url": "/images/spacetimedc_pic.jpg",
            "icon_url": "/images/browser.svg",
            "github_url": "https://github.com/vadimcastro/SpacetimeDC",
            "technical_implementation": {
                "systemArchitecture": [
                    "SpacetimeDB server module in Rust implementing reducers for fleet management, telemetry ingestion, and settlement math.",
                    "Bun-based synthetic grid simulator updating operational state over high-throughput WebSocket subscriptions."
                ]
            },
            "status": "active"
        },
        {
            "id": 7,
            "slug": "andre8004",
            "title": "andre8004",
            "short_description": "A multi-chain reputation routing and trust verification engine for autonomous AI agents based on ERC-8004 and ERC-402.",
            "long_description": "andre8004 provides off-chain consensus caching, Sybil-slashing computations, and on-chain cryptographic state root verification for autonomous agent networks on the Circle Arc testnet. Built with Bun, SQLite, Chainlink Functions, Privy server wallets, and ERC-3009 USDC gasless settlements.",
            "tech_stack": {
                "Runtime & Storage": ["Bun", "SQLite (WAL mode)", "Viem"],
                "Smart Contracts": ["Solidity 0.8.20", "Chainlink Functions", "ERC-8004", "ERC-3009 USDC"],
                "Integrations": ["Circle Arc L1", "Privy Server Wallets", "8004scan API", "Walrus Archival Protocol"]
            },
            "features": [
                {
                    "title": "Sybil-Resistant Scoring",
                    "description": "Time-Weighted Moving Average (TWMA) score decay paired with Concentrated Co-interaction Index (CCI) clique slashing.",
                    "icon": "Lock"
                },
                {
                    "title": "Sub-60ms Merkle Factory",
                    "description": "Generates compact cryptographic state roots over verified agents, committed on-chain via Chainlink Functions DON.",
                    "icon": "Network"
                },
                {
                    "title": "Gasless P2P Settlement",
                    "description": "Performs ERC-3009 USDC off-chain signed header transfers (X-PAYMENT) prior to agent task execution.",
                    "icon": "CreditCard"
                }
            ],
            "image_url": "/images/andre8004_pic.jpg",
            "icon_url": "/images/browser.svg",
            "github_url": "https://github.com/vadimcastro/andre8004",
            "technical_implementation": {
                "systemArchitecture": [
                    "High-performance Bun ETL runtime storing normalized feedback logs in WAL-mode SQLite database.",
                    "Off-chain Merkle tree generator paired with Chainlink Functions contract bridge and Privy server-side agent wallet signers."
                ]
            },
            "status": "active"
        },
        {
            "id": 8,
            "slug": "aura",
            "title": "AURA",
            "short_description": "A Sui-native reputation routing, policy-enforced wallet, and verifiable memory auditing protocol for autonomous trading agents.",
            "long_description": "AURA (Autonomous Utility & Reputation Architecture) solves key delegated AI execution challenges on Sui. Featuring Hot Potato Trade Tickets for atomic Move policy enforcement, SUI stake-bonded reputation registries with dispute games, and Seal-encrypted audit trails archived to Walrus.",
            "tech_stack": {
                "Smart Contracts": ["Sui Move", "DeepBook Predict Integration", "Sui Kiosk"],
                "Audit & Storage": ["Walrus Protocol", "Seal Client-Side AES-256-GCM Encryption"],
                "AI & Orchestration": ["TypeScript SDK", "gemma-4 / Llama 3.3 Hybrid Consensus Judges", "zkLogin"]
            },
            "features": [
                {
                    "title": "Hot Potato Trade Tickets",
                    "description": "Atomic Move PTB execution boundaries ensuring borrowed agent funds cannot leave approved contract paths.",
                    "icon": "KeyRound"
                },
                {
                    "title": "Dispute Game & Slashing",
                    "description": "SUI stake bonds and 24-hour telemetry key disclosure mechanisms to penalize untruthful or rogue agents.",
                    "icon": "ShieldAlert"
                },
                {
                    "title": "Verifiable Encrypted Memory",
                    "description": "Trade reasoning and mind-trails encrypted client-side and archived to Walrus with on-chain blob_id commitments.",
                    "icon": "Database"
                }
            ],
            "image_url": "/images/aura_pic.png",
            "icon_url": "/images/aura_logo.png",
            "github_url": "https://github.com/vadimcastro/AURA",
            "technical_implementation": {
                "systemArchitecture": [
                    "Move policy module (agent_wallet_policy.move) leveraging Hot Potato pattern for atomic Programmable Transaction Blocks.",
                    "Walrus telemetry archiver uploading client-side encrypted audit trails and recording blob_id on-chain."
                ]
            },
            "status": "active"
        }
    ]

    for project_data in projects:
        data = {k: v for k, v in project_data.items() if k != "id"}
        existing = db.query(Project).filter(Project.slug == data["slug"]).first()
        if not existing:
            db_project = Project(**data)
            db.add(db_project)
            print(f"Seeded project: {data['slug']}")
        else:
            for key, value in data.items():
                setattr(existing, key, value)
            print(f"Updated project: {data['slug']}")
    
    db.commit()

