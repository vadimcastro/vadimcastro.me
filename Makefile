.PHONY: dev prod down clean migrate logs format help
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
	@echo "🚀 Pulling latest code and deploying..."
	@if [ -n "$(branch)" ]; then \
		echo "📡 Using branch: $(branch)"; \
		git pull origin $(branch); \
		GIT_BRANCH=$(branch) GIT_COMMIT_HASH=$$(git rev-parse HEAD) GIT_COMMIT_MESSAGE="$$(git log -1 --pretty=%B)" GIT_COMMIT_DATE="$$(git log -1 --format=%ci)" make down && GIT_BRANCH=$(branch) GIT_COMMIT_HASH=$$(git rev-parse HEAD) GIT_COMMIT_MESSAGE="$$(git log -1 --pretty=%B)" GIT_COMMIT_DATE="$$(git log -1 --format=%ci)" make prod; \
	else \
		echo "📡 Using branch: $$(git branch --show-current)"; \
		git pull origin $$(git branch --show-current); \
		GIT_BRANCH=$$(git branch --show-current) GIT_COMMIT_HASH=$$(git rev-parse HEAD) GIT_COMMIT_MESSAGE="$$(git log -1 --pretty=%B)" GIT_COMMIT_DATE="$$(git log -1 --format=%ci)" make down && GIT_BRANCH=$$(git branch --show-current) GIT_COMMIT_HASH=$$(git rev-parse HEAD) GIT_COMMIT_MESSAGE="$$(git log -1 --pretty=%B)" GIT_COMMIT_DATE="$$(git log -1 --format=%ci)" make prod; \
	fi
deploy-rebuild:
	@echo "🚀 Pulling latest code and rebuilding..."
	@if [ -n "$(branch)" ]; then \
		echo "📡 Using branch: $(branch)"; \
		git pull origin $(branch); \
		GIT_BRANCH=$(branch) GIT_COMMIT_HASH=$$(git rev-parse HEAD) GIT_COMMIT_MESSAGE="$$(git log -1 --pretty=%B)" GIT_COMMIT_DATE="$$(git log -1 --format=%ci)" make prod-rebuild; \
	else \
		echo "📡 Using branch: $$(git branch --show-current)"; \
		git pull origin $$(git branch --show-current); \
		GIT_BRANCH=$$(git branch --show-current) GIT_COMMIT_HASH=$$(git rev-parse HEAD) GIT_COMMIT_MESSAGE="$$(git log -1 --pretty=%B)" GIT_COMMIT_DATE="$$(git log -1 --format=%ci)" make prod-rebuild; \
	fi
# Git commands
pull:
	@echo "🔄 Pulling latest code..."
	@if [ -n "$(branch)" ]; then \
		echo "📡 Using branch: $(branch)"; \
		git pull origin $(branch); \
	else \
		echo "📡 Using branch: $$(git branch --show-current)"; \
		git pull origin $$(git branch --show-current); \
	fi


# Droplet management
droplet:
	@echo "Connecting to DigitalOcean Droplet..."
	ssh root@206.81.2.168
droplet-logs:
	@echo "Viewing API logs on droplet..."
	ssh root@206.81.2.168 "docker logs docker-api-1 | tail -20"
droplet-force-rebuild:
	@echo "Force rebuilding on droplet..."
	ssh root@206.81.2.168 "cd vadimcastro.me && docker compose -f docker/docker-compose.prod.yml down && docker system prune -f && docker compose -f docker/docker-compose.prod.yml build --no-cache && docker compose -f docker/docker-compose.prod.yml up -d"
droplet-debug:
	@echo "Running debug commands on droplet..."
	ssh root@206.81.2.168 "cd vadimcastro.me && echo '=== Container Status ===' && docker ps && echo '=== API Logs ===' && docker logs docker-api-1 | tail -10 && echo '=== Environment Check ===' && docker exec -it docker-api-1 printenv | grep -E '(ENVIRONMENT|POSTGRES_DB)' && echo '=== CORS Middleware ===' && docker logs docker-api-1 | grep -i 'Adding CORS middleware'"
droplet-deploy:
	@echo "🚀 Starting automated droplet deployment..."
	@if [ -n "$(branch)" ]; then \
		echo "📡 Deploying branch: $(branch)"; \
		ssh root@206.81.2.168 "cd vadimcastro.me && git pull origin $(branch) && export GIT_BRANCH=$(branch) && export GIT_COMMIT_HASH=\$\$(git rev-parse HEAD) && export GIT_COMMIT_MESSAGE=\"\$\$(git log -1 --pretty=%B)\" && export GIT_COMMIT_DATE=\"\$\$(git log -1 --format=%ci)\" && docker compose -f docker/docker-compose.prod.yml down && docker compose -f docker/docker-compose.prod.yml up --build -d"; \
	else \
		echo "📡 Deploying branch: $$(git branch --show-current)"; \
		ssh root@206.81.2.168 "cd vadimcastro.me && git pull origin $$(git branch --show-current) && export GIT_BRANCH=$$(git branch --show-current) && export GIT_COMMIT_HASH=\$\$(git rev-parse HEAD) && export GIT_COMMIT_MESSAGE=\"\$\$(git log -1 --pretty=%B)\" && export GIT_COMMIT_DATE=\"\$\$(git log -1 --format=%ci)\" && docker compose -f docker/docker-compose.prod.yml down && docker compose -f docker/docker-compose.prod.yml up --build -d"; \
	fi
	@echo "✅ Deployment complete!"
	@echo "🌐 Frontend: http://206.81.2.168:3000"
	@echo "🔧 API: http://206.81.2.168:8000"
	@echo "📊 Check logs: ssh root@206.81.2.168 'cd vadimcastro.me && docker compose -f docker/docker-compose.prod.yml logs -f'"
droplet-status:
	@echo "Checking droplet status..."
	ssh root@206.81.2.168 "cd vadimcastro.me && docker compose -f docker/docker-compose.prod.yml ps && docker logs docker-api-1 | tail -5"
setup-prod-env:
	@echo "Setting up production environment..."
	./scripts/setup-production-env.sh
setup-local-auth:
	@echo "Setting up local development authentication..."
	./scripts/setup-local-auth.sh
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
clean:
	@echo "Cleaning up development environment..."
	docker system prune -f
	rm -rf frontend/.next frontend/node_modules
clean-all: clean
	@echo "Removing volumes and rebuilding..."
	docker compose -f docker/docker-compose.prod.yml down -v
# Utility commands
logs:
	@echo "Showing logs..."
	docker compose logs -f
format:
	@echo "Formatting code..."
	cd frontend && npm run format
	cd backend && black .
# Help command
help:
	@echo "🚀 VadimCastro.me Development Commands"
	@echo ""
	@echo "📱 Development:"
	@echo "  make dev                    - Start development environment"
	@echo "  make setup-local-auth       - Configure local authentication"
	@echo "  make logs                   - Show container logs"
	@echo "  make clean                  - Clean up environment"
	@echo ""
	@echo "🌐 Deployment:"
	@echo "  make droplet-deploy         - Deploy current branch to production"
	@echo "  make droplet-deploy branch=X- Deploy specific branch to production"
	@echo "  make droplet-status         - Check production status"
	@echo ""
	@echo "🗄️ Database:"
	@echo "  make migrate                - Run migrations"
	@echo "  make migrate-create name=X  - Create new migration"
	@echo ""
	@echo "💻 Droplet Access:"
	@echo "  make droplet                - SSH into production server"