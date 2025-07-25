# Vadim Castro - Personal Website & Cloud Storage

A full-stack web application featuring a personal portfolio, admin dashboard, and cloud storage capabilities.

## =� Live Production

- **Website**: http://206.81.2.168:3000
- **API**: http://206.81.2.168:8000
- **Status**:  Fully Deployed & Operational

## =� Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, SQLAlchemy
- **Database**: PostgreSQL with Alembic migrations
- **Cache**: FastAPI Cache with in-memory backend
- **Infrastructure**: Docker Compose, DigitalOcean Droplet
- **Authentication**: JWT tokens with secure cookie storage

## � Quick Start

### Production Deployment

```bash
# 1. Connect to your droplet
make droplet

# 2. Pull latest code
make pull

# 3. Set up production environment (first time only)
make setup-prod-env

# 4. Deploy everything
make deploy
```

### Local Development

```bash
# Start development environment
make dev

# Available at:
# Frontend: http://localhost:3000
# API: http://localhost:8000
```

## =� Project Structure

```
vadimcastro.me/
   frontend/           # Next.js React application
   backend/           # FastAPI Python backend
   docker/           # Docker configuration
   scripts/          # Automation scripts
   docs/            # Documentation
   infrastructure/   # Terraform AWS config
```

## =' Available Make Commands

### Development
- `make dev` - Start development environment
- `make dev-debug` - Start with debug logging
- `make format` - Format code (frontend + backend)

### Production  
- `make prod` - Start production environment
- `make deploy` - Pull latest code and deploy
- `make setup-prod-env` - Set up production secrets

### Database
- `make migrate` - Run database migrations
- `make migrate-create name=migration_name` - Create new migration

### Utilities
- `make down` - Stop all containers
- `make clean` - Clean development environment
- `make logs` - Show all container logs
- `make droplet` - SSH into production droplet

## = Security Features

- **Environment Separation**: Isolated dev/prod configurations
- **Secrets Management**: Git-ignored production secrets
- **Strong Authentication**: JWT with secure password hashing
- **CORS Protection**: Configured for specific origins
- **Database Security**: Dedicated production user and database

## =� Features

### Admin Dashboard
-  User authentication and session management
-  Real-time metrics (visitors, sessions, projects)
-  Notes management system
-  Responsive design

### API Endpoints
-  Authentication (`/api/v1/auth/`)
-  User management (`/api/v1/users/`)
-  Metrics (`/api/v1/metrics/`)
-  Notes (`/api/v1/notes/`)
-  Health check (`/health`)

## <� Recent Achievements

-  **Full Production Deployment** - Successfully deployed to DigitalOcean
-  **Database Migration System** - Automated Alembic migrations
-  **CORS Configuration** - Proper cross-origin request handling
-  **Cache Implementation** - FastAPI cache for performance
-  **Secure Authentication** - JWT-based auth with proper credential handling
-  **Environment Management** - Automated production secret generation

## =� Current Branch: `feature/mobile-friendly`

Working on mobile responsiveness improvements for better user experience across all devices.

## =� Documentation

- [Development Setup](CLAUDE.md) - Detailed development guide
- [Production Quickstart](PRODUCTION_QUICKSTART.md) - Fast production deployment
- [Environment Reference](docs/ENVIRONMENT_REFERENCE.md) - Complete environment variables guide
- [Secret Management](docs/SECRET_MANAGEMENT_GUIDE.md) - Security best practices

## <� Deployment Success

This application has been successfully deployed and is running in production with:
- Zero downtime deployment capability
- Automated database migrations
- Secure environment variable management
- Full CORS and authentication functionality
- Real-time metrics and caching

---

Built with d by Vadim Castro | Deployed with > [Claude Code](https://claude.ai/code)