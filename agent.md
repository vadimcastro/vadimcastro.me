# VadimCastro.me - Agent Reference

This file provides context for LLMs (Gemini, Claude, etc.) to understand the project's unique structure and requirements.

## 🚀 Key Entry Points
- **Main Entry**: [README.md](README.md)
- **Local Dev Setup**: [docs/development.md](docs/development.md)
- **Production Guide**: [docs/production.md](docs/production.md)

## 🏗️ Technical Context
- **Frontend**: Next.js 14 (App Router). Uses standard Tailwind CSS and Framer Motion.
- **Backend**: FastAPI (Python 3.11). Standard SQLAlchemy 2.0+ with Pydantic 2.0+.
- **Database**: PostgreSQL on port 5432.
- **Dev Modes**: 
  - `make dev`: Normal `docker compose` up with builds.
  - `make dev-ultra`: Uses pre-built base images (`vadimcastro-me-*-base`) for faster startup, typically skipping internal builds.

## 📝 Critical Development Rules
1. **Migrations**: For local dev, `make migrate` is used to both create tables and initialize the admin user via `backend/scripts/migrate.sh`.
2. **Environment**: Never commit `.env.*.local` files. Standard defaults reside in `.env.development`.
3. **Ports**: 
   - Frontend: 3000
   - API: 8000
   - DB: 5432
   - Redis: 6379

## 🧹 Modernization Focus
We are currently cleaning up "vadimOS" artifacts (hardcoded paths, personal IPs, and environment-specific shell aliases) to make the project standalone and portable.

## 🔧 Core Workflow Commands
```bash
make dev              # Start environment
make dev-ultra        # Faster startup (pre-built)
make setup-local-auth # Auth test/setup
make migrate          # DB Schema + Admin Init
make logs             # View logs
make clean            # Container cleanup
```
