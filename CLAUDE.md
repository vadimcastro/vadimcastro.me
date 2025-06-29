# Development Environment Overview

## 🎉 Production Status: DEPLOYED & OPERATIONAL ✅

**Live Production**: http://206.81.2.168:3000 | API: http://206.81.2.168:8000

## Quick Start

### Local Development
```bash
make dev
```

### Production Deployment
```bash
make droplet          # Connect to droplet
make pull            # Pull latest code  
make setup-prod-env  # Set up environment (first time)
make deploy          # Deploy everything
```

The development command will:
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

## Production Deployment Status ✅

**Successfully deployed and operational** on DigitalOcean Droplet:
- **Frontend**: http://206.81.2.168:3000 ✅ WORKING
- **API**: http://206.81.2.168:8000 ✅ WORKING
- **Authentication**: vadim@vadimcastro.pro / meowmix0 ✅ WORKING
- **Database**: PostgreSQL with vadimcastro_prod ✅ WORKING
- **Metrics Dashboard**: All endpoints operational ✅ WORKING

### Recent Production Achievements 🏆
- ✅ **Full Stack Deployment** - Frontend, backend, database all operational
- ✅ **Authentication System** - JWT-based login working perfectly
- ✅ **Database Migration System** - Automated Alembic migrations successful  
- ✅ **CORS Configuration** - Proper cross-origin request handling
- ✅ **Cache Implementation** - FastAPI cache initialized and working
- ✅ **Environment Management** - Secure production secrets system
- ✅ **Metrics Dashboard** - Real-time visitor, session, and project metrics

### Production Commands
```bash
# Quick deployment workflow
make droplet          # SSH to droplet
make pull            # Get latest code
make deploy          # Deploy everything

# First-time setup
make setup-prod-env  # Create production environment

# Database operations  
docker exec docker-api-1 bash -c "cd /app && alembic upgrade head"
docker exec docker-api-1 python3 /app/scripts/init_db.py
```

### Deployment Architecture
- **Infrastructure**: DigitalOcean Droplet (Ubuntu)
- **Containerization**: Docker Compose production setup
- **Database**: PostgreSQL with dedicated production user (vadim_prod)
- **Caching**: FastAPI in-memory cache for metrics
- **Security**: Environment-separated secrets, JWT authentication
- **Monitoring**: Comprehensive logging and health checks