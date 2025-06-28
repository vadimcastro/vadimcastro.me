# Environment Configuration Guide

## Security & Environment Separation

This project properly separates development and production environments to ensure security.

## Setup Instructions

### For Development
1. Development uses `.env.development` (safe to commit)
2. Contains non-sensitive default values
3. Uses separate dev database and weak secrets

### For Production  
1. **Copy the template**: `cp .env.production .env.production.local`
2. **Edit `.env.production.local`** with your actual production values:

```bash
# Generate strong passwords and secrets
POSTGRES_PASSWORD=your_strong_db_password_here
SECRET_KEY=$(openssl rand -base64 32)
JWT_SECRET_KEY=$(openssl rand -base64 32)
ADMIN_PASSWORD=your_secure_admin_password
```

3. **Never commit `.env.production.local`** - it's in `.gitignore`

## Current Production Setup

To deploy with proper security:

1. Edit your production environment file:
```bash
nano .env.production.local
```

2. Update these critical values:
   - `POSTGRES_PASSWORD` - Strong database password
   - `SECRET_KEY` - Strong encryption key
   - `ADMIN_PASSWORD` - Your secure admin password
   - `JWT_SECRET_KEY` - Different from SECRET_KEY

3. Deploy:
```bash
make deploy
```

## Security Benefits

✅ **Separate databases**: `vadimcastro_dev` vs `vadimcastro_prod`  
✅ **Different Redis databases**: DB 0 (dev) vs DB 1 (prod)  
✅ **Strong secrets**: Generated per environment  
✅ **No hardcoded credentials**: All externalized  
✅ **Git-safe**: Sensitive files ignored  

## Environment Variables Reference

| Variable | Dev Value | Prod Value | Purpose |
|----------|-----------|------------|---------|
| POSTGRES_DB | vadimcastro_dev | vadimcastro_prod | Database separation |
| POSTGRES_PASSWORD | devpassword123 | (your strong password) | Database security |
| SECRET_KEY | dev-secret | (generated strong key) | App encryption |
| ADMIN_PASSWORD | devpassword | (your secure password) | Admin access |
| REDIS_URL | redis:6379/0 | redis:6379/1 | Cache separation |