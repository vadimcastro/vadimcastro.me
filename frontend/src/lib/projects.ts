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
      Database: ["PostgreSQL"],
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
        "The system utilizes a dual-engine approach to route calculation. The primary engine handles standard point-to-point navigation using the Google Maps Directions API, while a secondary 'Scenic Discovery' engine processes POI data from a custom-indexed PostgreSQL database.",
        "Route optimization is performed asynchronously via a Python-based worker that evaluates potential detours against user-defined time constraints, ensuring that scenic additions never exceed a specific percentage of the original ETA."
      ],
      algorithm: {
        description: "Our proprietary Scenic-Detour-Optimizer (SDO) selects high-value POIs along a corridor surrounding the optimal route.",
        steps: [
          "Generate a baseline optimal route using the A* algorithm variant.",
          "Construct a search corridor (buffer) with a radius based on the user's available detour time.",
          "Score nearby POIs based on scenic ratings, category preferences, and detour overhead.",
          "Iteratively insert high-scoring waypoints into the route while verifying time constraints."
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
        "Full-stack photography platform with Next.js 14 frontend and FastAPI REST backend.",
        "Integrates Google Photos OAuth2 workflow with server-side token management and Redis metadata caching."
      ]
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
        "The platform is engineered as a modular system ensuring strict separation between FastAPI backend services and Next.js 16 frontend.",
        "Infrastructure health and engagement analytics are powered by a robust data layer consisting of PostgreSQL for persistent storage and Redis for metric caching."
      ]
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
        "Modular infrastructure template leveraging Next.js 16 App Router and FastAPI backend with Pydantic v2 schema validation.",
        "Configured with automated GitHub Actions security audit workflows and production HTTPS Docker Compose setups."
      ]
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
        "Client-side WebAudio processing graph (GainNode -> BiquadFilterNodes -> DynamicsCompressorNode).",
        "Manifest V3 compliant background worker and popup state management using webextension-polyfill."
      ]
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
        "SpacetimeDB server module in Rust implementing reducers for fleet management, telemetry ingestion, and settlement math.",
        "Bun-based synthetic grid simulator updating operational state over high-throughput WebSocket subscriptions."
      ]
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
        "High-performance Bun ETL runtime storing normalized feedback logs in WAL-mode SQLite database.",
        "Off-chain Merkle tree generator paired with Chainlink Functions contract bridge and Privy server-side agent wallet signers."
      ]
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
        "Move policy module (agent_wallet_policy.move) leveraging Hot Potato pattern for atomic Programmable Transaction Blocks.",
        "Walrus telemetry archiver uploading client-side encrypted audit trails and recording blob_id on-chain."
      ]
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