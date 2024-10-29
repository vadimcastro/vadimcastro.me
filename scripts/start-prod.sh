# scripts/start-prod.sh
#!/bin/bash
set -e

echo "Starting production environment..."

# Ensure we're in the right directory
cd "$(dirname "$0")/.."

# Start services with production configuration
cd docker
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Health check endpoint
echo "Checking health endpoints..."
timeout 30 bash -c 'while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:8000/health)" != "200" ]]; do sleep 5; done' || exit 1
echo "API is healthy!"