# vadimcastro.me Makefile
# Project-specific configuration for vadimOS

# Project variables
PROJECT_NAME = vadimcastro.me
DROPLET_ALIAS = droplet
PRODUCTION_IP = 206.81.2.168

# Compose files for development
COMPOSE_DEV = -f docker/docker-compose.yml -f docker/docker-compose.dev.yml
COMPOSE_ULTRA = $(COMPOSE_DEV) -f docker/docker-compose.dev.ultra.yml

# Development Targets
.PHONY: dev dev-ultra down clean logs migrate ps status

dev:
	@echo "🚀 Starting development environment..."
	docker compose $(COMPOSE_DEV) up --build

dev-ultra:
	@echo "⚡ Starting lightning-fast ULTRA development..."
	docker compose $(COMPOSE_ULTRA) up

# Management
down:
	@echo "🛑 Stopping containers..."
	docker compose $(COMPOSE_DEV) down

clean:
	@echo "🧹 Cleaning containers and orphans (Data Safe)..."
	docker compose $(COMPOSE_DEV) down --remove-orphans

clean-all:
	@echo "🚨 WARNING: Wiping all containers, orphans, and DATA VOLUMES..."
	docker compose $(COMPOSE_DEV) down -v --remove-orphans

logs:
	docker compose $(COMPOSE_DEV) logs -f

# Database
migrate:
	@echo "📦 Running database migrations..."
	docker compose $(COMPOSE_DEV) exec api /app/scripts/migrate.sh

# Health & Status
ps:
	docker compose $(COMPOSE_DEV) ps

status:
	@./scripts/docker-health.sh

# Project-specific PHONY targets
.PHONY: auth-setup setup-local-auth

# Project-specific commands
auth-setup: setup-local-auth

setup-local-auth:
	@echo "Setting up local development authentication..."
	./scripts/setup-local-auth.sh

# Custom down command for production
prod-down:
	@echo "🛑 Stopping all production services..."
	@docker compose -f docker/docker-compose.prod.yml down
	@echo "✅ All production services stopped"