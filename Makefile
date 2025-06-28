.PHONY: dev prod down clean migrate migrate-create logs test format
# Development commands
dev:
	@echo "Starting development environment..."
	cd docker && docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
dev-debug:
	@echo "Starting development environment with debug logs..."
	cd docker && docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build 2>&1 | tee debug.log
# Production commands
prod:
	@echo "Starting production environment..."
	docker compose -f docker/docker-compose.prod.yml up --build -d
prod-rebuild:
	@echo "Rebuilding and starting production environment..."
	docker compose -f docker/docker-compose.prod.yml down && docker compose -f docker/docker-compose.prod.yml build --no-cache && docker compose -f docker/docker-compose.prod.yml up -d
deploy:
	@echo "Pulling latest code and deploying..."
	git pull origin master && make down && make prod
deploy-rebuild:
	@echo "Pulling latest code and rebuilding..."
	git pull origin master && make prod-rebuild
# Droplet management
droplet:
	@echo "Connecting to DigitalOcean Droplet..."
	ssh root@206.81.2.168
# Database commands
migrate:
	@echo "Running migrations..."
	docker compose exec api alembic upgrade head
migrate-create:
	@if [ -z "$(name)" ]; then \
		echo "Error: Migration name not provided. Use 'make migrate-create name=your_migration_name'"; \
		exit 1; \
	fi
	@echo "Creating new migration: $(name)"
	docker compose exec api alembic revision --autogenerate -m "$(name)"
# Cleanup commands
down:
	@echo "Stopping containers..."
	docker compose -f docker/docker-compose.prod.yml down
clean: down
	@echo "Cleaning up development environment..."
	rm -rf frontend/.next
	rm -rf frontend/node_modules
	docker system prune -f
clean-volumes: clean
	@echo "Removing volumes..."
	docker compose down -v
# Utility commands
logs:
	@echo "Showing logs..."
	docker compose logs -f
frontend-logs:
	@echo "Showing frontend logs..."
	docker compose logs -f frontend
api-logs:
	@echo "Showing API logs..."
	docker compose logs -f api
format:
	@echo "Formatting code..."
	cd frontend && npm run format
	cd backend && black .
# Help command
help:
	@echo "Available commands:"
	@echo "  make dev              - Start development environment"
	@echo "  make dev-debug        - Start development environment with debug logging"
	@echo "  make prod             - Start production environment"
	@echo "  make down             - Stop containers"
	@echo "  make clean            - Clean up development environment"
	@echo "  make clean-volumes    - Clean up including volumes"
	@echo "  make migrate          - Run database migrations"
	@echo "  make migrate-create   - Create new migration (use with name=migration_name)"
	@echo "  make logs            - Show all container logs"
	@echo "  make frontend-logs   - Show frontend container logs"
	@echo "  make api-logs        - Show API container logs"
	@echo "  make format          - Format code"