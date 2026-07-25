# Updated stop-docker.sh (place in scripts/)
#!/bin/bash
cd "$(dirname "$0")/../docker"  # Change to docker directory from scripts
docker-compose down