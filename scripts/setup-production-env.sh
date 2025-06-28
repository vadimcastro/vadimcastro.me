#!/bin/bash

# Production Environment Setup Script
# This script helps you create secure production environment configuration

set -e  # Exit on any error

echo "🔐 Production Environment Setup"
echo "==============================="
echo

# Check if production env file already exists
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

# Generate secrets
DB_PASSWORD=$(openssl rand -base64 32)
SECRET_KEY=$(openssl rand -base64 32) 
JWT_SECRET_KEY=$(openssl rand -base64 32)
SUGGESTED_ADMIN_PASSWORD=$(openssl rand -base64 16)

echo "✅ Secrets generated successfully!"
echo

# Get user inputs
echo "👤 Admin User Configuration:"
read -p "Admin Email [vadim@vadimcastro.pro]: " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-vadim@vadimcastro.pro}

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
else
    ADMIN_PASSWORD=$SUGGESTED_ADMIN_PASSWORD
fi

read -p "Admin Username [vadimcastro]: " ADMIN_USERNAME
ADMIN_USERNAME=${ADMIN_USERNAME:-vadimcastro}

read -p "Admin Display Name [Vadim Castro]: " ADMIN_NAME
ADMIN_NAME=${ADMIN_NAME:-"Vadim Castro"}

echo
echo "📝 Creating .env.production.local..."

# Create the production environment file
cat > .env.production.local << EOF
# 🔒 PRODUCTION SECRETS - Keep this file secure!
# Generated on $(date)

# Database - Strong credentials
POSTGRES_USER=vadim_prod
POSTGRES_PASSWORD=$DB_PASSWORD
POSTGRES_DB=vadimcastro_prod
POSTGRES_HOST=db

# Redis
REDIS_URL=redis://redis:6379/1

# Security - Generated unique secrets
SECRET_KEY=$SECRET_KEY
JWT_SECRET_KEY=$JWT_SECRET_KEY

# Admin User
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD=$ADMIN_PASSWORD
ADMIN_USERNAME=$ADMIN_USERNAME
ADMIN_NAME=$ADMIN_NAME

# Environment
ENVIRONMENT=production
DEBUG=false
EOF

echo "✅ .env.production.local created successfully!"
echo

# Security reminders
echo "🛡️  Security Reminders:"
echo "• Your .env.production.local file is git-ignored (secure)"
echo "• Database password: $DB_PASSWORD"
echo "• Admin password: $ADMIN_PASSWORD"
echo "• Store these passwords in your password manager!"
echo

# Show next steps
echo "🚀 Next Steps:"
echo "1. Save the passwords above in your password manager"
echo "2. Deploy your application: make deploy"
echo "3. Test login at: http://206.81.2.168:3000"
echo

# Offer to show the file
read -p "Do you want to review the generated .env.production.local file? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo
    echo "📄 Generated .env.production.local:"
    echo "=================================="
    cat .env.production.local
fi

echo
echo "🎉 Production environment setup complete!"
echo "Run 'make deploy' to deploy with your new secure configuration."