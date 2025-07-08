# vadimcastro.me Makefile
# Project-specific configuration for vadimOS

# Project variables for vadimOS.mk
PROJECT_NAME = vadimcastro.me
DROPLET_ALIAS = droplet
PRODUCTION_IP = 206.81.2.168

# Include universal vadimOS commands
include ../vadimOS/vadimOS.mk

# Project-specific PHONY targets
.PHONY: auth-setup setup-local-auth

# Project-specific commands (overrides or additions)
auth-setup: setup-local-auth

# Override setup-local-auth to use correct path
setup-local-auth:
	@echo "Setting up local development authentication..."
	./scripts/setup-local-auth.sh

# Custom down command for vadimcastro.me (override)
down:
	@echo "🛑 Stopping all services..."
	@docker compose -f docker/docker-compose.prod.yml down
	@echo "✅ All services stopped"