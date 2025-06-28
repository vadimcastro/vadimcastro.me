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
# Git commands
pull:
	@echo "Pulling latest code from origin/master..."
	git pull origin master
# Droplet management
droplet:
	@echo "Connecting to DigitalOcean Droplet..."
	ssh root@206.81.2.168
droplet-logs:
	@echo "Viewing API logs on droplet..."
	ssh root@206.81.2.168 "docker logs docker-api-1 | tail -20"
droplet-cors-test:
	@echo "Testing CORS on droplet..."
	ssh root@206.81.2.168 'curl -v -H "Origin: http://206.81.2.168:3000" -H "Access-Control-Request-Method: GET" -X OPTIONS http://206.81.2.168:8000/health'
droplet-force-rebuild:
	@echo "Force rebuilding on droplet..."
	ssh root@206.81.2.168 "cd vadimcastro.me && docker compose -f docker/docker-compose.prod.yml down && docker system prune -f && docker compose -f docker/docker-compose.prod.yml build --no-cache && docker compose -f docker/docker-compose.prod.yml up -d"
droplet-debug:
	@echo "Running debug commands on droplet..."
	ssh root@206.81.2.168 "cd vadimcastro.me && echo '=== Container Status ===' && docker ps && echo '=== API Logs ===' && docker logs docker-api-1 | tail -10 && echo '=== Environment Check ===' && docker exec -it docker-api-1 printenv | grep -E '(ENVIRONMENT|POSTGRES_DB)' && echo '=== CORS Middleware ===' && docker logs docker-api-1 | grep -i 'Adding CORS middleware'"
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
	@echo ""
	@echo "Git commands:"
	@echo "  make pull            - Pull latest code from origin/master"
	@echo ""
	@echo "Droplet commands:"
	@echo "  make droplet         - SSH into droplet"
	@echo "  make droplet-logs    - View API logs on droplet"
	@echo "  make droplet-cors-test - Test CORS on droplet"
	@echo "  make droplet-force-rebuild - Force rebuild on droplet"
	@echo "  make droplet-debug   - Run all debug commands on droplet"