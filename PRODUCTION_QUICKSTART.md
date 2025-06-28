# 🚀 Production Deployment Quickstart

## Option 1: Automated Setup (Recommended)

```bash
# Run the automated setup script
./scripts/setup-production-env.sh

# Deploy with your new secure configuration
make deploy

# Test your deployment
curl http://206.81.2.168:8000/health
```

**That's it!** The script will:
- ✅ Generate strong, unique secrets
- ✅ Create your `.env.production.local` file
- ✅ Prompt you for admin credentials
- ✅ Keep everything secure and git-ignored

## Option 2: Manual Setup

### Step 1: Generate Secrets
```bash
# Generate each secret (run these commands separately)
openssl rand -base64 32  # Use for POSTGRES_PASSWORD
openssl rand -base64 32  # Use for SECRET_KEY  
openssl rand -base64 32  # Use for JWT_SECRET_KEY
openssl rand -base64 16  # Use for ADMIN_PASSWORD (or create your own)
```

### Step 2: Create Environment File
```bash
# Copy the template
cp .env.production .env.production.local

# Edit with your generated secrets
nano .env.production.local
```

### Step 3: Fill in the Template
```bash
# Database - Use the first generated secret
POSTGRES_PASSWORD=PASTE_FIRST_GENERATED_SECRET_HERE

# Security - Use the next two generated secrets  
SECRET_KEY=PASTE_SECOND_GENERATED_SECRET_HERE
JWT_SECRET_KEY=PASTE_THIRD_GENERATED_SECRET_HERE

# Admin - Use the fourth secret or your own password
ADMIN_PASSWORD=PASTE_FOURTH_GENERATED_SECRET_OR_YOUR_PASSWORD
```

### Step 4: Deploy
```bash
make deploy
```

## 🔍 Verification Steps

### 1. Check Environment is Production
```bash
curl http://206.81.2.168:8000/health | grep production
# Should return: "environment":"production"
```

### 2. Verify Database Separation
```bash
docker logs docker-api-1 | grep vadimcastro_prod
# Should show: connecting to vadimcastro_prod database
```

### 3. Test Admin Login
```bash
# Try logging in at: http://206.81.2.168:3000
# Use your ADMIN_EMAIL and ADMIN_PASSWORD from .env.production.local
```

### 4. Confirm Security
```bash
# Verify secrets are not in git
git status
# Should NOT show .env.production.local

# Check secrets are loaded
docker exec -it docker-api-1 printenv | grep SECRET | head -1
# Should show: SECRET_KEY=your_generated_secret
```

## 📋 What You Get

### 🔒 Security Features
- **Separate production database**: `vadimcastro_prod` 
- **Strong generated secrets**: 256-bit entropy
- **Git-ignored secrets**: No accidental commits
- **Environment isolation**: Dev vs prod separation
- **Unique credentials**: Different from development

### 🏗️ Infrastructure
- **Production-ready setup**: Optimized for deployment
- **Health monitoring**: `/health` endpoint
- **Error handling**: Graceful failures
- **Container isolation**: Docker security
- **Volume persistence**: Data survives restarts

## 🛟 Need Help?

### Quick References
- 📖 **Detailed Guide**: `docs/SECRET_MANAGEMENT_GUIDE.md`
- 📋 **Environment Reference**: `docs/ENVIRONMENT_REFERENCE.md`
- 🔧 **Original Setup**: `ENVIRONMENT_SETUP.md`

### Common Commands
```bash
# View your secrets (locally only)
cat .env.production.local

# Regenerate environment (if needed)
./scripts/setup-production-env.sh

# Reset deployment
make down && make deploy

# View deployment logs
make logs
```

### Troubleshooting
```bash
# Check container status
docker ps

# View API logs
docker logs docker-api-1

# Test database connection
curl -X POST http://206.81.2.168:8000/admin/init-db

# Check environment variables
docker exec -it docker-api-1 printenv | grep -E "(ENVIRONMENT|POSTGRES_DB)"
```

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ `curl http://206.81.2.168:8000/health` returns `"environment":"production"`
- ✅ Admin login works at `http://206.81.2.168:3000`
- ✅ Database is `vadimcastro_prod` (not `vadimcastro`)
- ✅ `.env.production.local` is not tracked by git
- ✅ All containers are running (`docker ps`)

**Time to completion: ~5 minutes** ⏱️

---

🎉 **You're now running a secure, production-ready deployment!**