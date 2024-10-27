# scripts/start-prod.sh
#!/bin/bash
set -e

# Start all services in production mode
cd docker
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d