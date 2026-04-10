# vadimcastro.me Makefile

# Project variables
PROJECT_NAME = vadimcastro.me
PROJECT_SLUG ?= vpt-core

# Compose files for development
COMPOSE_DEV = -f docker/docker-compose.yml -f docker/docker-compose.dev.yml
COMPOSE_ULTRA = $(COMPOSE_DEV) -f docker/docker-compose.dev.ultra.yml

# Development Targets
.PHONY: dev dev-ultra build-base down clean logs migrate ps status

dev:
	@echo "🚀 Starting development environment..."
	@if docker image inspect $(PROJECT_SLUG)-frontend-base:latest >/dev/null 2>&1 && docker image inspect $(PROJECT_SLUG)-backend-base:latest >/dev/null 2>&1; then \
		echo "Using shared base images: $(PROJECT_SLUG)-*"; \
	else \
		echo "Base images missing. Building for PROJECT_SLUG=$(PROJECT_SLUG)..."; \
		PROJECT_SLUG=$(PROJECT_SLUG) ./scripts/build-base-images.sh; \
	fi
	PROJECT_SLUG=$(PROJECT_SLUG) docker compose $(COMPOSE_ULTRA) up

dev-ultra:
	@echo "⚡ Starting lightning-fast development..."
	@if docker image inspect $(PROJECT_SLUG)-frontend-base:latest >/dev/null 2>&1 && docker image inspect $(PROJECT_SLUG)-backend-base:latest >/dev/null 2>&1; then \
		echo "Using shared base images: $(PROJECT_SLUG)-*"; \
	else \
		echo "Base images missing. Building for PROJECT_SLUG=$(PROJECT_SLUG)..."; \
		PROJECT_SLUG=$(PROJECT_SLUG) ./scripts/build-base-images.sh; \
	fi
	PROJECT_SLUG=$(PROJECT_SLUG) docker compose $(COMPOSE_ULTRA) up

build-base:
	@chmod +x scripts/build-base-images.sh
	PROJECT_SLUG=$(PROJECT_SLUG) ./scripts/build-base-images.sh

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
