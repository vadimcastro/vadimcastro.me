# backend/scripts/start.sh
#!/bin/bash
set -e

# Wait for postgres
echo "Waiting for postgres..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Run migrations
echo "Running database migrations..."
alembic upgrade head

# Start the application
echo "Starting application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload