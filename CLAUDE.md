# Development Environment Overview

## Quick Start
```bash
make dev
```

This single command will:
- Build and start all services (frontend, backend, database, redis)
- Run database migrations automatically 
- Initialize the database with seed data
- Start frontend on http://localhost:3000
- Start API on http://localhost:8000

## Tech Stack
- **Frontend**: Next.js 13 with TypeScript, Tailwind CSS
- **Backend**: FastAPI with Python, SQLAlchemy, Alembic migrations
- **Database**: PostgreSQL with Redis for caching
- **Infrastructure**: Docker Compose setup

## Available Make Commands
- `make dev` - Start development environment
- `make dev-debug` - Start development environment with debug logging
- `make prod` - Start production environment
- `make down` - Stop containers
- `make clean` - Clean up development environment
- `make clean-volumes` - Clean up including volumes
- `make migrate` - Run database migrations
- `make migrate-create name=migration_name` - Create new migration
- `make logs` - Show all container logs
- `make frontend-logs` - Show frontend container logs
- `make api-logs` - Show API container logs
- `make format` - Format code

## Development Notes
- The setup handles dependencies automatically through Docker
- API container runs migrations and DB initialization on startup
- Frontend runs on port 3000, API on port 8000
- PostgreSQL on port 5432, Redis on port 6379
- Everything should work out of the box with `make dev`

## Project Structure
- `frontend/` - Next.js application
- `backend/` - FastAPI application
- `docker/` - Docker configuration files
- `infrastructure/` - Terraform and AWS configuration

## Production Deployment
Currently deployed on DigitalOcean Droplet with Cloudflare SSL:
- **Frontend**: https://vadimcastro.pro (or http://206.81.2.168:3000 direct)
- **API**: https://api.vadimcastro.pro (or http://206.81.2.168:8000 direct)
- **API Documentation**: https://api.vadimcastro.pro/docs
- **Admin Login**: vadim@vadimcastro.pro / meow

### Cloudflare Configuration
- SSL Mode: Flexible (free tier)
- Proxy enabled for all subdomains
- Automatic HTTPS redirects enabled

To deploy updates:
```bash
make deploy
```

For full rebuild:
```bash
make deploy-rebuild
```