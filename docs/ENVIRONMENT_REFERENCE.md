# Environment Configuration Reference Manual

## 📋 Complete Environment Variables Reference

### 🗄️ Database Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `POSTGRES_USER` | `postgres` | `vadim_prod` | Database username |
| `POSTGRES_PASSWORD` | `devpassword123` | `[STRONG_GENERATED]` | Database password |
| `POSTGRES_DB` | `vadimcastro_dev` | `vadimcastro_prod` | Database name |
| `POSTGRES_HOST` | `db` | `db` | Database hostname |
| `POSTGRES_PORT` | `5432` | `5432` | Database port |

### 🔐 Security Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `SECRET_KEY` | `dev-secret-key-not-for-production` | `[GENERATED_SECRET]` | App encryption key |
| `JWT_SECRET_KEY` | `dev-jwt-secret-key-not-for-production` | `[DIFFERENT_GENERATED_SECRET]` | JWT token signing |
| `ALGORITHM` | `HS256` | `HS256` | JWT algorithm (auto-set) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | `30` | Token expiration (auto-set) |

### 👤 Admin User Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `ADMIN_EMAIL` | `admin@localhost` | `vadim@vadimcastro.pro` | Admin login email |
| `ADMIN_PASSWORD` | `devpassword` | `[YOUR_SECURE_PASSWORD]` | Admin login password |
| `ADMIN_USERNAME` | `admin` | `vadimcastro` | Admin username |
| `ADMIN_NAME` | `Admin User` | `Vadim Castro` | Admin display name |

### 🚀 Application Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `ENVIRONMENT` | `development` | `production` | Environment identifier |
| `DEBUG` | `true` | `false` | Debug mode flag |
| `PROJECT_NAME` | `Vadim Castro API` | `Vadim Castro API` | API title (auto-set) |

### 📦 Cache Configuration

| Variable | Development | Production | Description |
|----------|-------------|------------|-------------|
| `REDIS_URL` | `redis://redis:6379/0` | `redis://redis:6379/1` | Redis connection string |

### 🌐 CORS Configuration (Auto-configured)

| Setting | Development | Production | 
|---------|-------------|------------|
| Origins | `localhost:3000, 127.0.0.1:3000` | `vadimcastro.pro, 206.81.2.168:3000` |
| Credentials | `true` | `true` |
| Methods | `GET, POST, PUT, DELETE, OPTIONS, PATCH` | `GET, POST, PUT, DELETE, OPTIONS, PATCH` |

## 📁 Environment File Structure

### File Hierarchy (Priority Order)
1. `.env.production.local` ← **Your secrets here** (git-ignored)
2. `.env.production` ← Template/defaults (committed)
3. `.env.development.local` ← Dev overrides (git-ignored)  
4. `.env.development` ← Dev defaults (committed)
5. `.env.local` ← Global overrides (git-ignored)
6. `.env` ← Global defaults (git-ignored)

### Current Files in Project

```
📁 vadimcastro.me/
├── .env.production.local     # 🔒 YOUR PRODUCTION SECRETS
├── .env.production          # 📄 Production template
├── .env.development         # 📄 Development defaults
└── docker/
    └── docker-compose.prod.yml  # 🐳 Uses .env.production.local
```

## 🔧 Environment Setup Commands

### Quick Setup (Production)
```bash
# 1. Generate your secrets
openssl rand -base64 32  # For SECRET_KEY
openssl rand -base64 32  # For JWT_SECRET_KEY  
openssl rand -base64 32  # For POSTGRES_PASSWORD
openssl rand -base64 16  # For ADMIN_PASSWORD

# 2. Create your production environment
cp .env.production .env.production.local

# 3. Edit with your generated secrets
nano .env.production.local

# 4. Deploy
make deploy
```

### Verification Commands
```bash
# Check which environment is loaded
docker exec -it docker-api-1 printenv ENVIRONMENT

# Verify database connection
docker exec -it docker-api-1 printenv POSTGRES_DB

# Check secrets are loaded (masked)
docker exec -it docker-api-1 printenv | grep SECRET | sed 's/=.*/=***MASKED***/'
```

## 🛠️ Environment File Templates

### `.env.production.local` Template
```bash
# 🔒 PRODUCTION SECRETS - Keep this file secure!

# Database - Strong credentials
POSTGRES_USER=vadim_prod
POSTGRES_PASSWORD=YOUR_STRONG_DB_PASSWORD_HERE
POSTGRES_DB=vadimcastro_prod
POSTGRES_HOST=db

# Redis
REDIS_URL=redis://redis:6379/1

# Security - Generate unique secrets
SECRET_KEY=YOUR_GENERATED_SECRET_KEY_HERE
JWT_SECRET_KEY=YOUR_DIFFERENT_JWT_SECRET_HERE

# Admin User - Your real credentials  
ADMIN_EMAIL=vadim@vadimcastro.pro
ADMIN_PASSWORD=YOUR_SECURE_ADMIN_PASSWORD
ADMIN_USERNAME=vadimcastro
ADMIN_NAME=Vadim Castro

# Environment
ENVIRONMENT=production
DEBUG=false
```

### `.env.development` (Already created)
```bash
# 📝 DEVELOPMENT DEFAULTS - Safe for git

# Database - Weak dev credentials
POSTGRES_USER=postgres
POSTGRES_PASSWORD=devpassword123
POSTGRES_DB=vadimcastro_dev
POSTGRES_HOST=db

# Redis
REDIS_URL=redis://redis:6379/0

# Security - Weak dev secrets
SECRET_KEY=dev-secret-key-not-for-production
JWT_SECRET_KEY=dev-jwt-secret-key-not-for-production

# Admin User - Dev credentials
ADMIN_EMAIL=admin@localhost
ADMIN_PASSWORD=devpassword
ADMIN_USERNAME=admin
ADMIN_NAME=Admin User

# Environment
ENVIRONMENT=development
DEBUG=true
```

## 🚀 Deployment Scenarios

### Scenario 1: Local Development
```bash
# Uses .env.development automatically
make dev
```

### Scenario 2: Production Deployment
```bash
# Uses .env.production.local
make deploy
```

### Scenario 3: Staging Environment
```bash
# Create staging environment
cp .env.production .env.staging.local
# Edit with staging-specific values
nano .env.staging.local

# Update docker-compose to use staging file
# Deploy with staging configuration
```

## 🔄 Environment Migration

### From Old Setup to New Setup
```bash
# Backup your old secrets
cp docker/docker-compose.prod.yml docker/docker-compose.prod.yml.backup

# Extract current secrets to new format
echo "POSTGRES_PASSWORD=$(grep POSTGRES_PASSWORD docker/docker-compose.prod.yml.backup | cut -d'=' -f2)" >> .env.production.local
echo "SECRET_KEY=$(grep SECRET_KEY docker/docker-compose.prod.yml.backup | cut -d'=' -f2)" >> .env.production.local

# Complete the rest of .env.production.local manually
nano .env.production.local
```

### Environment-Specific Overrides
```bash
# For temporary testing
export ADMIN_PASSWORD=temporary_test_password
make deploy

# For one-time deployments
POSTGRES_PASSWORD=different_password make deploy
```

## 🧪 Testing Different Configurations

### Test with Different Database
```bash
# Temporarily override database
echo "POSTGRES_DB=vadimcastro_test" >> .env.production.local
make deploy
# Remember to change it back!
```

### Test with Debug Mode
```bash
# Enable debug in production (temporarily)
echo "DEBUG=true" >> .env.production.local
make deploy
# Check logs for more detailed output
```

## 📊 Environment Status Dashboard

### Quick Status Check
```bash
#!/bin/bash
echo "=== Environment Status ==="
echo "Environment: $(docker exec -it docker-api-1 printenv ENVIRONMENT 2>/dev/null || echo 'Not running')"
echo "Database: $(docker exec -it docker-api-1 printenv POSTGRES_DB 2>/dev/null || echo 'Not running')"
echo "Debug Mode: $(docker exec -it docker-api-1 printenv DEBUG 2>/dev/null || echo 'Not running')"
echo "Redis DB: $(docker exec -it docker-api-1 printenv REDIS_URL 2>/dev/null | grep -o '/[0-9]' | cut -d'/' -f2 || echo 'Not running')"
```

### Health Check with Environment Info
```bash
curl http://206.81.2.168:8000/health | jq '.environment'
```

## ⚠️ Common Issues & Solutions

### Issue: "Environment variables not loading"
**Solution:**
```bash
# Check file exists
ls -la .env.production.local

# Verify docker-compose references correct file
grep -A5 "env_file" docker/docker-compose.prod.yml

# Restart containers
make deploy
```

### Issue: "Database connection failed"
**Solution:**
```bash
# Check database variables
docker exec -it docker-api-1 printenv | grep POSTGRES

# Verify database exists
docker exec -it docker-db-1 psql -U postgres -l

# Check network connectivity
docker exec -it docker-api-1 python3 -c "import psycopg2; print('OK')"
```

### Issue: "Secrets appear in logs"
**Solution:**
```bash
# Check for secret leaks
docker logs docker-api-1 | grep -i "password\|secret\|key"

# If found, rotate all affected secrets immediately
```

Remember: **Environment configuration is the foundation of secure deployments!** 🏗️