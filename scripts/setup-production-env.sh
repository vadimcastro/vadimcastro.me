#!/bin/bash

# Production Environment Setup Script for vadimcastro.me
# Generates secure production secrets and outputs .env.production.local

set -e

echo "🔐 vadimcastro Production Environment Setup"
echo "=========================================="
echo

if [ -f ".env.production.local" ]; then
    echo "⚠️  .env.production.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. Edit .env.production.local manually if needed."
        exit 1
    fi
fi

echo "🔑 Generating secure secrets..."

DB_PASSWORD=$(openssl rand -base64 32)
SECRET_KEY=$(openssl rand -base64 48)
JWT_SECRET_KEY=$(openssl rand -base64 48)
SUGGESTED_ADMIN_PASSWORD=$(openssl rand -base64 24)

echo "✅ Secrets generated successfully!"
echo

echo "👤 Admin User Configuration:"
read -p "Admin Email [admin@vadimcastro.me]: " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@vadimcastro.me}

echo
echo "🔒 Admin Password Options:"
echo "1) Use generated password: $SUGGESTED_ADMIN_PASSWORD"
echo "2) Enter your own password"
read -p "Choose option (1/2) [1]: " PASSWORD_OPTION
PASSWORD_OPTION=${PASSWORD_OPTION:-1}

if [ "$PASSWORD_OPTION" = "2" ]; then
    read -s -p "Enter admin password: " ADMIN_PASSWORD
    echo
    read -s -p "Confirm admin password: " ADMIN_PASSWORD_CONFIRM
    echo
    
    if [ "$ADMIN_PASSWORD" != "$ADMIN_PASSWORD_CONFIRM" ]; then
        echo "❌ Passwords don't match!"
        exit 1
    fi
    if [ ${#ADMIN_PASSWORD} -lt 12 ]; then
        echo "❌ Admin password must be at least 12 characters."
        exit 1
    fi
else
    ADMIN_PASSWORD=$SUGGESTED_ADMIN_PASSWORD
fi

read -p "Admin Username [vadim]: " ADMIN_USERNAME
ADMIN_USERNAME=${ADMIN_USERNAME:-vadim}

read -p "Admin Display Name [Vadim Castro]: " ADMIN_NAME
ADMIN_NAME=${ADMIN_NAME:-"Vadim Castro"}

echo
read -p "Allowed CORS origins (comma-separated, e.g. https://vadimcastro.me,https://www.vadimcastro.me) []: " CORS_ORIGINS
if [ -z "$CORS_ORIGINS" ]; then
    CORS_ORIGINS="https://vadimcastro.me,https://www.vadimcastro.me"
fi

echo
echo "📝 Creating .env.production.local..."

cat > .env.production.local << EOF
# 🔒 PRODUCTION SECRETS - Keep this file secure!
# Generated on $(date)

# Database
POSTGRES_USER=vadimcastro_prod
POSTGRES_PASSWORD=$DB_PASSWORD
POSTGRES_DB=vadimcastro_prod
POSTGRES_HOST=db

# Redis
REDIS_URL=redis://redis:6379/1

# Security
SECRET_KEY=$SECRET_KEY
JWT_SECRET_KEY=$JWT_SECRET_KEY
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=14
AUTH_MAX_FAILED_ATTEMPTS=5
AUTH_FAILED_WINDOW_SECONDS=300
AUTH_LOCKOUT_SECONDS=900

# Admin User
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD=$ADMIN_PASSWORD
ADMIN_USERNAME=$ADMIN_USERNAME
ADMIN_NAME=$ADMIN_NAME

# Environment
ENVIRONMENT=production
DEBUG=false
CORS_ORIGINS=$CORS_ORIGINS
EOF

echo "✅ .env.production.local created successfully!"
echo