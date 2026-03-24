# vadimcastro.me Makefile

# Project variables
PROJECT_NAME = vadimcastro.me

# Compose files for development
COMPOSE_DEV = -f docker/docker-compose.yml -f docker/docker-compose.dev.yml
COMPOSE_ULTRA = $(COMPOSE_DEV) -f docker/docker-compose.dev.ultra.yml

# Development Targets
.PHONY: dev dev-ultra down clean logs migrate ps status

dev:
	@echo "🚀 Starting development environment..."
	docker compose $(COMPOSE_DEV) up --build

dev-ultra:
	@echo "⚡ Starting lightning-fast development..."
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

# Authentication
.PHONY: auth-setup setup-local-auth

auth-setup: setup-local-auth

setup-local-auth:
	@echo "Setting up local development authentication..."
	./scripts/setup-local-auth.sh