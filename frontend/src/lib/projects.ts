// src/lib/projects.ts

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: {
    [key: string]: string[];
  };
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  imageUrl: string;
  iconUrl?: string;
  githubUrl?: string;
  status: 'active' | 'archived' | 'in_progress' | 'concept';
  technicalImplementation: {
    systemArchitecture: string[];
    algorithm?: {
      description: string;
      steps: string[];
    };
  };
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const INTERNAL_API_URL = 'http://api:8000';

const isServer = typeof window === 'undefined';
const API_BASE_URL = isServer ? INTERNAL_API_URL : NEXT_PUBLIC_API_URL;

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "scenic",
    title: "Scenic",
    shortDescription: "A smart navigation app that finds beautiful routes for your road trips, integrating scenic points of interest while keeping your journey time-efficient.",
    longDescription: "A modern navigation application that revolutionizes road trip planning by intelligently incorporating scenic routes and points of interest without significantly impacting journey time.",
    techStack: {
      Frontend: ["React", "Google Maps JavaScript API", "Tailwind CSS"],
      Backend: ["Python", "FastAPI", "Uvicorn"],
      Database: ["PostgreSQL", "PostGIS"],
      DevOps: ["Conda", "Git"]
    },
    features: [
      {
        title: "Multi-stop Navigation",
        description: "Support for up to 5 waypoints with intelligent scenic route calculation between each stop.",
        icon: "Navigation"
      },
      {
        title: "Interactive POI System",
        description: "Dynamic points of interest display with detailed modal views and map markers for scenic locations.",
        icon: "Map"
      },
      {
        title: "Customizable Time Range",
        description: "User-defined acceptable time increase (10-75%) for scenic detours with real-time route updates.",
        icon: "Clock"
      }
    ],
    imageUrl: "/images/scenic_pic.png",
    iconUrl: "/images/compass.svg",
    githubUrl: "https://github.com/vadimcastro/scenic",
    status: "concept",
    technicalImplementation: {
      systemArchitecture: [
        "The application employs a decoupled microservice architecture: a Next.js 14 App Router client for geo-rendering and a high-performance Python FastAPI backend for route calculation and POI corridor evaluation.",
        "Geospatial queries and POI indexing are handled via PostGIS-enabled PostgreSQL queries. A background worker thread pre-calculates spatial bounding boxes and corridor polygons using Turf.js math to filter candidate scenic detours asynchronously without blocking the client thread."
      ],
      algorithm: {
        description: "Proprietary Scenic-Detour-Optimizer (SDO) algorithm balancing route scenic score against user-configured detour time constraints.",
        steps: [
          "Compute baseline fastest route A* path between origin and destination waypoints.",
          "Construct a dynamic spatial buffer corridor around the baseline polyline sized proportionally to the maximum allowed detour percentage.",
          "Filter and score enclosed Points of Interest (POIs) using weighted metrics: POI rating, user category preference, and perpendicular distance from baseline.",
          "Perform iterative waypoint insertion and path recalculation, rejecting candidate detours that violate the hard T_detour <= T_max constraint."
        ]
      }
    }
  },
  {
    id: "2",
    slug: "dlm",
    title: "DLM Photo Gallery",
    shortDescription: "A high-performance personal photo gallery with Google Photos API integration, masonry layouts, and production-ready Docker infrastructure.",
    longDescription: "DLM Photo Gallery v2 combines custom photography management with seamless Google Photos OAuth2 integration. Built with Next.js 14 and FastAPI, it features dynamic masonry layouts, category filtering, fullscreen touch-optimized lightbox views, and image caching.",
    techStack: {
      Frontend: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
      Backend: ["FastAPI", "Python", "SQLAlchemy", "Alembic"],
      Integrations: ["Google Photos OAuth2 API", "JWT Auth"],
      Infrastructure: ["PostgreSQL", "Redis", "Docker Compose"]
    },
    features: [
      {
        title: "Google Photos Integration",
        description: "OAuth2 authentication flow with automatic album synchronization and categorization.",
        icon: "Image"
      },
      {
        title: "Responsive Masonry Gallery",
        description: "Touch-optimized, fluid masonry grid with interactive lightbox and category filtering.",
        icon: "Layout"
      },
      {
        title: "Performance & Caching",
        description: "Redis-backed image metadata caching, lazy loading, and resilient API retry logic.",
        icon: "Zap"
      }
    ],
    imageUrl: "/images/dlm_pic.jpg",
    iconUrl: "/images/browser.svg",
    githubUrl: "https://github.com/vadimcastro/DLM-Photo-Gallery",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Architected with Next.js 14 App Router and a FastAPI Python backend. Implements full Google Photos API OAuth2 authorization code flow with PKCE, managing token persistence and automated background access token refreshes.",
        "Server-side image metadata caching powered by Redis (1-hour TTL) reduces upstream Google Photos API latency by 85% and eliminates rate-limiting bottlenecks.",
        "The frontend employs a virtualized responsive masonry grid with IntersectionObserver lazy loading and blurred LQIP (Low-Quality Image Placeholder) pre-rendering to eliminate Cumulative Layout Shift (CLS) on image hydration."
      ],
      algorithm: {
        description: "Dynamic Masonry Layout and Image Caching Pipeline.",
        steps: [
          "Execute Google Photos OAuth2 PKCE authorization code exchange and store encrypted refresh tokens in PostgreSQL.",
          "Fetch album listings and query Redis cache; on cache miss, query Google MediaItems API and populate Redis asynchronously.",
          "Compute client-side column height balancing based on raw aspect ratios to prevent uneven gallery column drops.",
          "Hydrate high-resolution images on viewport intersection while serving low-latency webp thumbnails."
        ]
      }
    }
  },
  {
    id: "3",
    slug: "vadimcastro-me",
    title: "vadimcastro.com",
    shortDescription: "A modern, high-performance developer portfolio and live infrastructure telemetry dashboard.",
    longDescription: "A sophisticated portfolio platform built with Next.js 16 (App Router), React 19, and FastAPI. Features real-time infrastructure monitoring, engagement tracking, and a fluid responsive design system.",
    techStack: {
      Frontend: ["Next.js 16", "React 19", "Tailwind CSS v4", "Lucide React"],
      Backend: ["FastAPI", "SQLAlchemy 2", "Pydantic v2"],
      Infrastructure: ["Docker", "PostgreSQL", "Redis"]
    },
    features: [
      {
        title: "Infrastructure Dashboard",
        description: "Real-time CPU, Memory, and Disk monitoring with detailed modal views.",
        icon: "Activity"
      },
      {
        title: "Engagement Analytics",
        description: "Advanced interaction tracking for projects, resume views, and social links.",
        icon: "BarChart3"
      },
      {
        title: "Pydantic Modernization",
        description: "Full migration to Pydantic 2.0+ ensuring high-performance data validation and type safety.",
        icon: "Zap"
      }
    ],
    imageUrl: "/images/portfolio_pic.png",
    iconUrl: "/images/image-generator.png",
    githubUrl: "https://github.com/vadimcastro/vadimcastro.com",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Built on a modern stack leveraging Next.js 16 (App Router), React 19, and FastAPI. Integrates Pydantic v2 schemas configured with automatic to_camel alias generation to seamlessly bridge Python snake_case DB models with TypeScript camelCase clients.",
        "Features a real-time host telemetry monitoring pipeline: non-blocking Linux system calls and psutil subprocess collectors stream CPU, RAM, and Disk metrics to Redis every 5 seconds for live dashboard rendering.",
        "Implements a privacy-first interaction tracking engine with SHA-256 IP anonymization, capturing real-time analytics for project engagement, resume views, and social clicks without third-party tracking scripts."
      ],
      algorithm: {
        description: "High-Availability Fallback & Telemetry Aggregation Model.",
        steps: [
          "Execute non-blocking host telemetry polling via background worker and write 5-second sliding window metrics to Redis.",
          "Serve frontend project requests with 1-hour ISR (Incremental Static Regeneration) caching.",
          "Gracefully fall back to local INITIAL_PROJECTS static constants if the backend database container is offline during static export.",
          "Serialize API payloads through Pydantic v2 to_camel alias transformers for zero-overhead JSON parsing."
        ]
      }
    }
  },
  {
    id: "4",
    slug: "fulldock",
    title: "FullDock",
    shortDescription: "A battle-tested, security-hardened full-stack starter engine featuring Next.js 16, React 19, FastAPI, PostgreSQL, and Docker.",
    longDescription: "FullDock is an open-source, production-ready template for enterprise and developer applications. Includes automated secret scanning (gitleaks), JWT access/refresh token rotation with session revocation, Google/GitHub OAuth integrations, and one-command Docker deployment pipelines.",
    techStack: {
      Frontend: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4"],
      Backend: ["FastAPI", "SQLAlchemy 2", "Pydantic v2", "Alembic"],
      "Security & Auth": ["JWT Token Rotation", "OAuth2 (Google/GitHub)", "Gitleaks CI"],
      Services: ["PostgreSQL", "Redis", "Docker Compose"]
    },
    features: [
      {
        title: "Security Defaults",
        description: "CI/CD security pipeline with gitleaks secret scanning, login rate throttling, and cookie-based HTTPS session revocation.",
        icon: "ShieldCheck"
      },
      {
        title: "Unified Social OAuth",
        description: "Built-in Google and GitHub authentication flows with unified profile state synchronization.",
        icon: "Key"
      },
      {
        title: "One-Command Operations",
        description: "Comprehensive Makefile tooling for local dev, database migrations, and production HTTPS compose deployments.",
        icon: "Terminal"
      }
    ],
    imageUrl: "/images/fulldock_pic.jpg",
    iconUrl: "/images/browser.svg",
    githubUrl: "https://github.com/vadimcastro/FullDock",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Production-grade full-stack Docker engine combining Next.js 16, FastAPI, PostgreSQL 16, and Redis. Features multi-stage Dockerfiles compiled from alpine base images with non-root runtime users and healthcheck probes for sub-120MB container footprint.",
        "Security-first authentication architecture: short-lived JWT access tokens paired with HTTP-only, SameSite=Strict secure refresh cookies, combined with Redis token revocation blacklisting for instant session termination.",
        "Automated CI/CD security pipeline executing gitleaks static secret detection, Python AST syntax verification, Pytest suites, and Next.js static build checks on every pull request."
      ],
      algorithm: {
        description: "Dual JWT Token Rotation & Session Revocation Flow.",
        steps: [
          "Authenticate user credentials against Argon2id password hashes or verify Google/GitHub OAuth2 state tokens.",
          "Issue short-lived signed JWT access token (15 min expiry) alongside secure HTTP-only refresh cookie (7 day expiry).",
          "On request, validate access token signature; if expired, execute refresh rotation and verify refresh token UUID against Redis revocation list.",
          "Revoke active session across all devices instantly by writing user_id revocation timestamp to Redis."
        ]
      }
    }
  },
  {
    id: "5",
    slug: "soundfox",
    title: "SoundFox",
    shortDescription: "A local-first browser extension for Chrome and Firefox that stabilizes, equalizes, and boosts streaming audio up to 600%.",
    longDescription: "SoundFox is a lightweight WebAudio extension built with Vite and TypeScript. It features a customizable 5-band equalizer, 600% volume boosting, dynamic voice clarity (Dialog Mode), scene volume leveling (Level Mode), and per-tab/per-domain memory settings with custom hotkeys.",
    techStack: {
      "Extension Core": ["TypeScript", "Vite", "WebExtension Manifest V3", "webextension-polyfill"],
      "Audio Engine": ["WebAudio API", "BiquadFilterNode", "DynamicsCompressorNode", "GainNode"],
      "CI/CD": ["GitHub Actions Automated Extension Build"]
    },
    features: [
      {
        title: "600% Boost & 5-Band EQ",
        description: "Precision volume amplification coupled with persistent 5-band frequency tuning.",
        icon: "Sliders"
      },
      {
        title: "Dialog & Leveling Modes",
        description: "Real-time vocal enhancement for speech clarity and dynamic range compression for scene loudness smoothing.",
        icon: "Volume2"
      },
      {
        title: "Cross-Browser & Hotkeys",
        description: "Compatible with Chrome and Firefox, supporting customizable keyboard shortcuts for instant audio control.",
        icon: "Command"
      }
    ],
    imageUrl: "/images/soundfox_pic.jpg",
    iconUrl: "/images/browser.svg",
    githubUrl: "https://github.com/vadimcastro/SoundFox",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Built using TypeScript, Vite, and WebExtension Manifest V3 standards. Uses webextension-polyfill to maintain a single unified codebase running natively across Google Chrome, Brave, Edge, and Mozilla Firefox.",
        "Intercepts HTML5 media elements via MediaElementAudioSourceNode and constructs a low-latency WebAudio DSP processing graph: GainNode volume multiplier (amplifying up to 600%), 5-band BiquadFilterNode equalizer, and DynamicsCompressorNode for scene loudness smoothing.",
        "Persists domain-specific volume and EQ presets in chrome.storage.local, with background service worker listeners automatically re-applying custom profiles as tabs navigate."
      ],
      algorithm: {
        description: "WebAudio DSP Signal Processing & Dynamic Range Compression.",
        steps: [
          "Capture active tab HTML5 audio element and bind AudioContext source node.",
          "Pass audio signal through 5 cascaded BiquadFilterNodes (peaking/lowshelf/highshelf filters at 60Hz, 250Hz, 1kHz, 4kHz, 12kHz).",
          "Route equalized signal into GainNode scaling volume up to 6.0x (600%).",
          "Apply DynamicsCompressorNode (threshold: -24dB, knee: 30, ratio: 12, attack: 0.003s, release: 0.25s) to eliminate digital clipping and smooth sudden peak transients."
        ]
      }
    }
  },
  {
    id: "6",
    slug: "spacetimedc",
    title: "SpacetimeDC",
    shortDescription: "A real-time data-center virtual power plant (VPP) simulation and grid regulation settlement engine built on SpacetimeDB and Rust.",
    longDescription: "SpacetimeDC models megawatt-scale AI campuses in Northern Virginia (PJM zone) operating as dispatchable grid assets. The system responds to grid frequency stress using battery discharge and IT load curtailment, logging cleared response events into an immutable on-chain settlement ledger.",
    techStack: {
      "Backend & Engine": ["SpacetimeDB", "Rust", "WebSockets"],
      Frontend: ["Vite", "React", "TypeScript", "Bun"],
      Simulator: ["Bun Fleet Simulator", "PJM RegD Grid Signal Model"]
    },
    features: [
      {
        title: "Unified Shared State",
        description: "SpacetimeDB multi-client subscriptions sync backend dispatchers, simulator fleets, and frontend UI in real-time.",
        icon: "Cpu"
      },
      {
        title: "Dual Regulation Response",
        description: "Automated power dispatch combining fast battery discharge (primary) and flexible compute curtailment (secondary).",
        icon: "Zap"
      },
      {
        title: "Auditable Settlement Ledger",
        description: "Every cleared 2-second response tick creates an immutable ledger row calculating wholesale market payouts.",
        icon: "FileText"
      }
    ],
    imageUrl: "/images/spacetimedc_pic.jpg",
    iconUrl: "/images/browser.svg",
    githubUrl: "https://github.com/vadimcastro/SpacetimeDC",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Engineered as a real-time data-center Virtual Power Plant (VPP) control plane. Built with SpacetimeDB and Rust compiled to WebAssembly, running server-side reducers for grid frequency regulation in Northern Virginia (PJM zone).",
        "Subsecond multi-client state synchronization via persistent WebSocket subscriptions, streaming live telemetry from Bun synthetic generator fleets to Next.js dashboard clients with under 50ms latency.",
        "Implements automated financial settlement accounting, logging every 2-second frequency response event into an immutable SpacetimeDB settlement table calculation."
      ],
      algorithm: {
        description: "Dual-Source Frequency Regulation & Settlement Payout Model.",
        steps: [
          "Ingest 2-second grid frequency signal f(t); calculate frequency deviation delta_f = f(t) - 60.0 Hz.",
          "Compute required power regulation delta_P = -K_droop * delta_f * P_capacity.",
          "Dispatch primary fast-response power using battery energy storage system (BESS) discharge up to C-rate bounds.",
          "Dispatch secondary flexible curtailment by shedding non-critical batch IT compute workloads if BESS state-of-charge drops below 20%.",
          "Commit settlement record calculating reward: Payout = P_cleared_MW * LMP_usd * (2 / 3600)."
        ]
      }
    }
  },
  {
    id: "7",
    slug: "andre8004",
    title: "andre8004",
    shortDescription: "A multi-chain reputation routing and trust verification engine for autonomous AI agents based on ERC-8004 and ERC-402.",
    longDescription: "andre8004 provides off-chain consensus caching, Sybil-slashing computations, and on-chain cryptographic state root verification for autonomous agent networks on the Circle Arc testnet. Built with Bun, SQLite, Chainlink Functions, Privy server wallets, and ERC-3009 USDC gasless settlements.",
    techStack: {
      "Runtime & Storage": ["Bun", "SQLite (WAL mode)", "Viem"],
      "Smart Contracts": ["Solidity 0.8.20", "Chainlink Functions", "ERC-8004", "ERC-3009 USDC"],
      Integrations: ["Circle Arc L1", "Privy Server Wallets", "8004scan API", "Walrus Archival Protocol"]
    },
    features: [
      {
        title: "Sybil-Resistant Scoring",
        description: "Time-Weighted Moving Average (TWMA) score decay paired with Concentrated Co-interaction Index (CCI) clique slashing.",
        icon: "Lock"
      },
      {
        title: "Sub-60ms Merkle Factory",
        description: "Generates compact cryptographic state roots over verified agents, committed on-chain via Chainlink Functions DON.",
        icon: "Network"
      },
      {
        title: "Gasless P2P Settlement",
        description: "Performs ERC-3009 USDC off-chain signed header transfers (X-PAYMENT) prior to agent task execution.",
        icon: "CreditCard"
      }
    ],
    imageUrl: "/images/andre8004_pic.jpg",
    iconUrl: "/images/browser.svg",
    githubUrl: "https://github.com/vadimcastro/andre8004",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Multi-chain AI agent reputation protocol built on Circle Arc testnet, Solidity 0.8.20, Bun, SQLite (WAL mode), and Privy server wallets.",
        "Sub-60ms Merkle Tree factory executing Keccak256 leaf tight-packing over verified agent ratings, committing state roots on-chain via Chainlink Functions Decentralized Oracle Network (DON).",
        "Integrates HTTP X-PAYMENT middleware enforcing ERC-3009 USDC gasless signed transfers via Privy server wallets before agent task execution, archiving full execution histories to Walrus Archival Protocol."
      ],
      algorithm: {
        description: "TWMA Reputation Decay & Sybil Clique Slashing Math.",
        steps: [
          "Compute Time-Weighted Moving Average (TWMA) score weight: w(t) = exp(-lambda * delta_t), decaying historical ratings smoothly.",
          "Calculate Concentrated Co-interaction Index (CCI) across agent feedback graphs to identify sybil feedback loops.",
          "Apply sybil penalty factor to ratings originating from dense collusion cliques.",
          "Pack leaf nodes as keccak256(abi.encodePacked(agent_id, score_scaled, nonce)) and construct Merkle tree root.",
          "Publish root hash to Chainlink Functions DON for on-chain contract state verification."
        ]
      }
    }
  },
  {
    id: "8",
    slug: "aura",
    title: "AURA",
    shortDescription: "A Sui-native reputation routing, policy-enforced wallet, and verifiable memory auditing protocol for autonomous trading agents.",
    longDescription: "AURA (Autonomous Utility & Reputation Architecture) solves key delegated AI execution challenges on Sui. Featuring Hot Potato Trade Tickets for atomic Move policy enforcement, SUI stake-bonded reputation registries with dispute games, and Seal-encrypted audit trails archived to Walrus.",
    techStack: {
      "Smart Contracts": ["Sui Move", "DeepBook Predict Integration", "Sui Kiosk"],
      "Audit & Storage": ["Walrus Protocol", "Seal Client-Side AES-256-GCM Encryption"],
      "AI & Orchestration": ["TypeScript SDK", "gemma-4 / Llama 3.3 Hybrid Consensus Judges", "zkLogin"]
    },
    features: [
      {
        title: "Hot Potato Trade Tickets",
        description: "Atomic Move PTB execution boundaries ensuring borrowed agent funds cannot leave approved contract paths.",
        icon: "KeyRound"
      },
      {
        title: "Dispute Game & Slashing",
        description: "SUI stake bonds and 24-hour telemetry key disclosure mechanisms to penalize untruthful or rogue agents.",
        icon: "ShieldAlert"
      },
      {
        title: "Verifiable Encrypted Memory",
        description: "Trade reasoning and mind-trails encrypted client-side and archived to Walrus with on-chain blob_id commitments.",
        icon: "Database"
      }
    ],
    imageUrl: "/images/aura_pic.png",
    iconUrl: "/images/aura_logo.png",
    githubUrl: "https://github.com/vadimcastro/AURA",
    status: "active",
    technicalImplementation: {
      systemArchitecture: [
        "Sui-native autonomous trading agent protocol built on Move smart contracts (agent_wallet_policy.move, aura_registry.move, agent_nft.move).",
        "Issues un-storable Hot Potato TradeTicket structs in Sui Move, forcing atomic Programmable Transaction Block (PTB) execution and guaranteeing borrowed agent capital cannot bypass allowlisted DeepBook DEX paths.",
        "Off-chain agent mind-trails encrypted client-side via Seal AES-256-GCM and stored as immutable blobs on Walrus Protocol, registering on-chain blob_id commitments.",
        "Features a multi-judge Thinker Panel (Nemotron, Qwen, Llama) evaluating market intents off-chain before signing trades to a Gemma-4 execution worker, backed by a 0.5% deflationary SUI buy-and-burn insurance pool."
      ],
      algorithm: {
        description: "Hot Potato Policy Enforcer & Optimistic Slashing Dispute Model.",
        steps: [
          "Agent requests capital allocation; policy module issues un-storable Hot Potato TradeTicket struct.",
          "Agent executes Programmable Transaction Block (PTB) trading on DeepBook DEX; Move runtime enforces ticket consumption before transaction completion.",
          "Encrypt trade reasoning client-side with AES-256-GCM and upload blob to Walrus Protocol.",
          "Register blob_id commitment on-chain in Sui Move aura_registry contract.",
          "Open 24-hour dispute window allowing challengers to submit key disclosures; if trade intent violates policy, slash agent SUI stake bond and route 0.5% protocol fee to insurance buy/burn pool."
        ]
      }
    }
  }
];

function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => Number(b.id) - Number(a.id));
}

function mapProject(data: any): Project {
  return {
    id: String(data.id),
    slug: data.slug,
    title: data.title,
    shortDescription: data.shortDescription || data.short_description,
    longDescription: data.longDescription || data.long_description,
    techStack: data.techStack || data.tech_stack,
    features: data.features,
    imageUrl: data.imageUrl || data.image_url,
    iconUrl: data.iconUrl || data.icon_url,
    githubUrl: data.githubUrl || data.github_url,
    status: data.status,
    technicalImplementation: data.technicalImplementation || data.technical_implementation || { systemArchitecture: [] }
  };
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      return sortProjects(INITIAL_PROJECTS);
    }
    
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return sortProjects(INITIAL_PROJECTS);
    }
    const mapped = data.map(mapProject);
    return sortProjects(mapped);
  } catch (error) {
    return sortProjects(INITIAL_PROJECTS);
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/${slug}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return INITIAL_PROJECTS.find(p => p.slug === slug);
      }
      throw new Error('Failed to fetch project');
    }
    
    const data = await response.json();
    return mapProject(data);
  } catch (error) {
    console.error(`Error fetching project by slug (${slug}):`, error);
    return INITIAL_PROJECTS.find(p => p.slug === slug);
  }
}