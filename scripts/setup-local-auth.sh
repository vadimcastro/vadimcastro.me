#!/bin/bash

# setup-local-auth.sh
# Sets up local development authentication

set -e

echo "🔧 setup-local-auth (inc. OAuth status)"
echo "📋 Ensuring database is up to date"
make migrate > /dev/null 2>&1 || echo "⚠️ Migration check failed, proceeding anyway"
echo "📋 Checking services"

ENV_FILE=".env.development"
if [ ! -f "$ENV_FILE" ]; then
    if [ -f ".env" ]; then
        ENV_FILE=".env"
    else
        echo "❌ Missing .env or .env.development"
        exit 1
    fi
fi

read_env_var() {
    local key="$1"
    grep -E "^${key}=" "$ENV_FILE" | tail -n 1 | cut -d'=' -f2-
}

ADMIN_EMAIL="$(read_env_var ADMIN_EMAIL)"
ADMIN_PASSWORD="$(read_env_var ADMIN_PASSWORD)"

if [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_PASSWORD" ]; then
    echo "❌ ADMIN_EMAIL or ADMIN_PASSWORD missing in $ENV_FILE"
    exit 1
fi

GOOGLE_ID="$(read_env_var GOOGLE_CLIENT_ID)"
GITHUB_ID="$(read_env_var GITHUB_CLIENT_ID)"

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker not running"
    exit 1
fi

echo "📋 Testing authentication endpoint"

max_attempts=15
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -s http://localhost:8000/health >/dev/null 2>&1; then
        break
    fi
    attempt=$((attempt + 1))
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "⚠️ API not currently listening on http://localhost:8000/health (start stack with 'make dev')"
    exit 0
fi

# Test login
response=$(curl -s -X POST http://localhost:8000/api/v1/auth/login \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "username=${ADMIN_EMAIL}&password=${ADMIN_PASSWORD}")

if echo "$response" | grep -q "access_token"; then
    echo "📋 Testing endpoints"
    token=$(echo "$response" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
    
    visitors=$(curl -s -H "Authorization: Bearer $token" "http://localhost:8000/api/v1/metrics/visitors" 2>/dev/null || echo "")
    
    echo "✅ Authentication test successful!"
    echo "📋 OAuth Status:"
    if [ -n "$GOOGLE_ID" ]; then echo "  ✅ Google OAuth: Configured"; else echo "  ⚠️  Google OAuth: Missing GOOGLE_CLIENT_ID"; fi
    if [ -n "$GITHUB_ID" ]; then echo "  ✅ GitHub OAuth: Configured"; else echo "  ⚠️  GitHub OAuth: Missing GITHUB_CLIENT_ID"; fi
    
    echo "📋 Credentials: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}"
    echo "🌐 Frontend: http://localhost:3000 | 🔧 API Docs: http://localhost:8000/docs"
else
    echo "❌ Authentication failed: $response"
    exit 1
fi