# Vadim Castro - Developer Portfolio & Infrastructure Dashboard

A modern, high-performance full-stack web application featuring a personal developer portfolio, administrative dashboard, and infrastructure metrics telemetry.

## 🚀 Quick Links

- [🛠️ Development Setup](docs/development.md) - Get up and running locally.
- [🌐 Production Guide](docs/production.md) - How to deploy to production (`vadimcastro.com`).
- [🔐 Security & Secrets](docs/SECRET_MANAGEMENT_GUIDE.md) - Best practices for security.
- [📝 Environment Reference](docs/ENVIRONMENT_REFERENCE.md) - Detailed environment variable list.

## 🏗️ Modern Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion 12, Lucide React
- **Backend**: FastAPI, Python 3.11+, Pydantic v2, SQLAlchemy, Alembic
- **Database & Cache**: PostgreSQL 15, Redis 7 (Rate Limiting & Session Revocation)
- **Security**: JWT Access/Refresh Token Rotation, OAuth2 (Google & GitHub), Redis Rate Limiting, HTTP Security Headers, CSP
- **Infrastructure**: Docker Compose (`docker-compose.dev.fast.yml`, `docker-compose.prod.yml`), Nginx reverse proxy
- **CI/CD & Quality**: GitHub Actions, GitLeaks secret scanner, Makefile tooling

## 🛠️ Rapid Startup

### Local Development

1. **Start services**:
   ```bash
   make dev
   ```
2. **Setup authentication** (first time):
   ```bash
   make auth
   ```
3. **Access**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## 📁 Project Structure

- `frontend/` - Next.js 16 & React 19 application
- `backend/` - FastAPI Python backend with OAuth & Redis security
- `docker/` - Docker configuration and Compose files
- `docs/` - Comprehensive architecture and deployment guides
- `scripts/` - Diagnostics (`docker-doctor.sh`), cleanup (`docker-prune-safe.sh`), and setup scripts

## 📋 Available Make Commands

- `make dev` - Start development environment
- `make dev REBUILD=1` - Rebuild images and start dev environment
- `make doctor` - Run system diagnostic check
- `make auth` - Setup local admin authentication credentials
- `make migrate` - Run database migrations & seed project data
- `make disk-usage` - Inspect Docker container disk consumption
- `make prune-safe` - Safe cleanup of unused Docker build caches
- `make logs` - Stream all container logs

---
*Maintained by Vadim Castro (vadimcastro.com)*
