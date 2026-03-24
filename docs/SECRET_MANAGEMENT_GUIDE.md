# Secret Management & Security Guide

## 🔐 Quick Start - Setting Up Production Secrets

### Step 1: Create Your Production Environment File

```bash
# Copy the template
cp .env.production .env.production.local

# Edit with your secrets (this file is git-ignored)
nano .env.production.local
```

### Step 2: Generate Strong Secrets

```bash
# Generate database password (copy this value)
openssl rand -base64 32

# Generate app secret key (copy this value) 
openssl rand -base64 32

# Generate JWT secret key (copy this value - should be different from above)
openssl rand -base64 32

# Generate admin password (or create your own strong password)
openssl rand -base64 16
```

### Step 3: Fill in Your `.env.production.local`

```bash
# Database - Use strong credentials
POSTGRES_USER=vadim_prod
POSTGRES_PASSWORD=PASTE_GENERATED_DB_PASSWORD_HERE
POSTGRES_DB=vadimcastrome_prod
POSTGRES_HOST=db

# Redis  
REDIS_URL=redis://redis:6379/1

# Security - Use generated secrets
SECRET_KEY=PASTE_GENERATED_SECRET_KEY_HERE
JWT_SECRET_KEY=PASTE_DIFFERENT_JWT_SECRET_HERE

# Admin User - Your actual credentials
ADMIN_EMAIL=admin@vadimcastro.me
ADMIN_PASSWORD=PASTE_GENERATED_ADMIN_PASSWORD_HERE
ADMIN_USERNAME=vadimcastro
ADMIN_NAME=Vadim Castro

# Environment
ENVIRONMENT=production
DEBUG=false
```

## 🔑 Secret Generation Tools

### Option 1: OpenSSL (Recommended)
```bash
# Strong password (32 chars)
openssl rand -base64 32

# Medium password (16 chars)  
openssl rand -base64 16

# Hex format (64 chars)
openssl rand -hex 32
```

### Option 2: Python
```bash
# Generate in Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
python3 -c "import secrets; print(secrets.token_hex(32))"
```

### Option 3: Online Tools (Use with caution)
- [1Password Secret Generator](https://1password.com/password-generator/)
- [Bitwarden Generator](https://bitwarden.com/password-generator/)

## 🛡️ Security Best Practices

### ✅ DO:
- **Use different secrets** for each environment (dev/staging/prod)
- **Generate long, random secrets** (32+ characters)
- **Use different keys** for different purposes (SECRET_KEY ≠ JWT_SECRET_KEY)
- **Store secrets outside of git** (in `.env.production.local`)
- **Use environment variables** instead of hardcoded values
- **Rotate secrets periodically** (every 6-12 months)
- **Use a password manager** to store your secrets securely

### ❌ DON'T:
- **Never commit secrets to git**
- **Don't use weak passwords** like "password123"
- **Don't reuse secrets** across different services
- **Don't share secrets** in chat/email
- **Don't use production secrets** in development
- **Don't hardcode secrets** in source code

## 📁 File Security

### Git-Protected Files
These files are automatically ignored by git:
```
.env.production.local     # Your actual production secrets
.env.development.local    # Your local dev overrides
.env.local               # General local overrides
```

### Committed Files (Safe)
These contain templates/examples only:
```
.env.production          # Template with placeholder values
.env.development         # Safe dev defaults
```

## 🚀 Deployment Security

### Production Checklist
Before deploying to production:

1. **✅ Generated all secrets** using strong methods
2. **✅ Confirmed `.env.production.local` exists** and has real values
3. **✅ Verified secrets are NOT in git** (`git status` shows clean)
4. **✅ Database password is strong** (30+ chars)
5. **✅ Admin password is secure** (you can remember/store safely)
6. **✅ All SECRET_KEY values are different** from each other

### Test Your Setup
```bash
# Verify your secrets are loaded
make deploy

# Check logs show production database
docker logs docker-api-1 | grep -i "vadimcastrome_prod"

# Test your admin login works
curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin@vadimcastro.me&password=YOUR_ADMIN_PASSWORD" \
  http://206.81.2.168:8000/api/v1/auth/login
```

## 💾 Secret Storage Options

### Option 1: Local File (Current Setup)
- **Pros**: Simple, works everywhere
- **Cons**: Must backup separately
- **Best for**: Single-server deployments

### Option 2: Cloud Secret Managers (Future)
```bash
# AWS Secrets Manager
aws secretsmanager get-secret-value --secret-id prod/vadimcastro/db

# Azure Key Vault  
az keyvault secret show --vault-name VadimVault --name db-password

# Google Secret Manager
gcloud secrets versions access latest --secret="db-password"
```

### Option 3: Docker Swarm Secrets
```yaml
# For Docker Swarm deployments
secrets:
  db_password:
    external: true
```

## 🔄 Secret Rotation

### When to Rotate:
- **Every 6-12 months** (routine)
- **After team member leaves** (security)
- **After potential breach** (emergency)
- **Before major releases** (good practice)

### How to Rotate:
1. **Generate new secrets** using the same methods above
2. **Update `.env.production.local`** with new values
3. **Deploy the changes** (`make deploy`)
4. **Test that everything works**
5. **Securely delete old secrets** from your records

## 🆘 Emergency Procedures

### If Secrets Are Compromised:
1. **🚨 IMMEDIATELY rotate all secrets**
2. **🔍 Check git history** for accidental commits
3. **📧 Notify team members** if applicable
4. **🛡️ Review access logs** for unauthorized usage
5. **📝 Document the incident** and prevention steps

### Git Accident Recovery:
```bash
# If you accidentally committed secrets
git rm --cached .env.production.local
git commit -m "Remove accidentally committed secrets"

# Remove from git history (if needed)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env.production.local' \
  --prune-empty --tag-name-filter cat -- --all
```

## 📚 Tools & Resources

### Password Managers
- [1Password](https://1password.com/) - Team favorite
- [Bitwarden](https://bitwarden.com/) - Open source
- [LastPass](https://www.lastpass.com/) - Popular option

### Security Auditing
```bash
# Check for secrets in git history
git log --all --grep="password\|secret\|key" -i

# Scan for potential secrets in code
grep -r -i "password\|secret\|key" . --exclude-dir=.git

# Check environment loading
docker exec -it docker-api-1 printenv | grep -E "(SECRET|PASSWORD|KEY)"
```

Remember: **Security is a process, not a destination!** 🔒