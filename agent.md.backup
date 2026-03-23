# VadimCastro.me Development Environment

## 🚀 Quick Start

### Local Development
```bash
make dev              # Start all services locally (standard)
make dev-ultra        # ⚡ Start with pre-built vadimcastro-me base images (2x faster)
make setup-local-auth # First-time auth setup
```

### Ultra-Fast Development (NEW! 🚀)
```bash
vcb                   # Navigate + syncos + VS Code + dev-ultra + browser (one command!)
make build-base       # Build vadimcastro-me base images for ultra startup
make dev-ultra        # Lightning-fast startup using pre-built base images
```

### Production Deployment
```bash
make droplet-deploy           # Standard deployment
make droplet-quick-deploy     # ⚡ Fast deployment (uses cache)
make droplet-quick-rebuild    # 🚀 Quick rebuild (partial cache clear)
make droplet-clean-rebuild    # 🧹 Deep clean rebuild (full cache clear)
```

## 🏗️ Tech Stack
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS
- **Backend**: FastAPI with Python, SQLAlchemy, Alembic
- **Database**: PostgreSQL with Redis caching
- **Infrastructure**: Docker Compose, DigitalOcean Droplet
- **Base Images**: vadimcastro-me-frontend-base, vadimcastro-me-backend-base (NEW! 🚀)

## ✅ Status Update (July 8, 2025)

### Current Status - ALL SYSTEMS OPERATIONAL! 🚀
- ✅ **Frontend**: Working perfectly on port 3000
- ✅ **API**: Fixed - dev-ultra mode working with proper volume mounts  
- ✅ **Database**: PostgreSQL with `vadimcastrome` database + all tables
- ✅ **Authentication**: 100% working with setup-local-auth fixes
- ✅ **Base Images**: vadimcastro-me-* images optimized and functional
- ✅ **Notes Endpoint**: Fixed - notes table created and operational

### Breakthrough Fixes Applied (July 8, 2025)
- **Volume Mount Revolution**: Simplified to `../../backend:/app` eliminates all import issues
- **Database Creation**: Standardized `vadimcastrome` naming + reliable migration scripts  
- **Migration Reliability**: Fixed bash execution + complete model imports (User, Project, UserSession, Note)
- **Makefile Integration**: Added setup-local-auth override for path resolution

### Recent Updates (July 7, 2025)
- **Completed**: vc-resume → vadimcastro-me naming standardization
- **Added**: Ultra-fast development with pre-built base images
- **Fixed**: Database naming compatibility (vadimcastro-me → vadimcastrome)
- **Enhanced**: vcb command with full dev-ultra integration

## 🌐 Production Environment
- **Frontend**: http://206.81.2.168:3000
- **API**: http://206.81.2.168:8000
- **Status**: ✅ Operational
- **Branch**: `master`

## ⚡ Terminal Workflow

### Enhanced Navigation & Development
```bash
# Basic Navigation
vc                    # Navigate to vadimcastro.me project (basic)
vcc                   # Navigate + syncos + VS Code (code mode)
vcb                   # Navigate + syncos + VS Code + dev-ultra + browser (full dev mode!)

# Other Projects  
dlm                   # Navigate to photo gallery project
vpt                   # Navigate to vadim-project-template
vos                   # Navigate to vadimOS infrastructure

# Git & SSH
gs                    # Git status
gcp "message"         # Add, commit, push in one command
glog                  # Show last commit
d                     # SSH to droplet
vd                    # SSH to droplet + CD to vadimcastro.me
```

### Shell Configuration
```bash
# Local (macOS/zsh)
sz                    # Source ~/.zshrc (reload config)
vz                    # Edit ~/.zshrc
vp                    # Edit ~/.zprofile
shortcuts             # Show all available aliases

# Droplet (Ubuntu/bash)  
sb                    # Source ~/.bashrc (reload config)
vb                    # Edit ~/.bashrc
gsb                   # Generate ~/.bashrc from template + source
shortcuts             # Show all available aliases
```

### Docker Shortcuts
```bash
dps                   # Docker container status
dclean                # Clean up Docker system
dlog                  # Follow Docker logs
dex                   # Execute into Docker container
```

## 🔧 Essential Commands

### Development
```bash
dev                   # Start development environment (alias for make dev)
make setup-local-auth # Configure local authentication
logs                  # View container logs (alias for make droplet-logs)
make clean            # Clean up environment
```

### Deployment
```bash
deploy                                        # Deploy current local branch to production (alias)
make droplet-deploy branch=BRANCH             # Deploy specific branch to production
quick-deploy                                  # ⚡ Fast deployment (alias for make droplet-quick-deploy)
make droplet-quick-rebuild                    # 🚀 Quick rebuild (partial cache clear)
make droplet-clean-rebuild                    # 🧹 Deep clean rebuild (full cache clear)
```

### Database
```bash
make migrate                       # Run migrations
make migrate-create name=NAME      # Create new migration
```

### Maintenance & Cleanup
```bash
make droplet-deep-clean        # 🧹 Comprehensive cleanup (Docker + logs + system updates)
make droplet-disk-usage        # 💾 Check disk usage and Docker stats
make clean-branches            # 🗑️ Delete all non-master branches locally
make droplet-clean-branches    # 🗑️ Delete all non-master branches on droplet
make help                      # 📖 Show all available commands
d                              # 🔗 Passwordless SSH access (alias for ssh droplet)
```

## 📁 Project Structure
```
├── frontend/           # Next.js application
├── backend/            # FastAPI application
├── docker/             # Docker configurations
├── scripts/            # Deployment & setup scripts
│   └── droplet-bashrc  # 🐚 Droplet bash configuration
└── CLAUDE.md           # 📖 Development documentation
```

## 🐚 Shell Configuration

### Local Environment (macOS + zsh)
- **File**: `~/.zshrc` 
- **Features**: Docker CLI path, project navigation, development aliases
- **Special**: `v` alias for droplet SSH + auto-cd

### Production Environment (Ubuntu + bash)  
- **File**: `/root/.bashrc` (deploy from `scripts/droplet-bashrc`)
- **Features**: Production-focused aliases, enhanced history, colored prompt, self-deployment
- **Deploy**: Run `gsb` on droplet (copies template + sources automatically)

### Key Differences
| Feature | Local (zsh) | Droplet (bash) |
|---------|-------------|----------------|
| Shell reload | `sz` | `sb` |  
| Edit config | `vz` | `vb` |
| Docker CLI | Added to PATH | System installed |
| Project path | `/Users/vadimcastro/Desktop/PROJECTS/vadimcastro.me` | `/root/vadimcastro.me` |



## 🎯 Development Workflow

### Ultra-Fast Development (FIXED! 🚀)
```bash
vcb                   # Navigate + syncos + VS Code + dev-ultra + browser + auth (one command!)
make dev-ultra        # Lightning-fast startup using pre-built base images
make setup-local-auth # Authentication setup (now working perfectly)
```

### Standard Development  
```bash
make dev              # Standard development environment
make build-base       # Build vadimcastro-me base images for ultra startup
```

### Database Warnings (Normal)
**Symptoms**: Constant PostgreSQL collation warnings in logs  
**Status**: Normal behavior - can be safely ignored  
**Info**: PostgreSQL 15 collation version warnings don't affect functionality



## 🎯 vadimOS Development Values

**Core Principles:**
- **Efficiency First**: Every command should save time and reduce cognitive load
- **Universal Consistency**: Same commands work across all projects
- **Context Awareness**: Tools should understand the project environment
- **Fail Fast**: Clear error messages and quick recovery paths
- **Documentation as Code**: Keep docs in sync with reality

**Workflow Philosophy:**
- Minimize context switching between tools and projects
- Automate repetitive tasks (navigation, setup, deployment)
- Make complex operations simple and discoverable
- Ensure every project follows the same patterns
- Optimize for developer happiness and productivity

## 🔧 Core vadimOS Commands
**Project Navigation:** `vc` (basic), `vcc` (code), `vcb` (browser+dev)  
**Development:** `gs`, `gcp "msg"`, `glog`, `dev`, `dev-ultra`, `deploy`  
**Production:** `quick-deploy`, `deploy-clean`, `logs`, `d` (SSH droplet), `vc-deploy`  
**Authentication:** `auth-setup`, `auth-setup-fast`  
**Utilities:** `kd`, `shortcuts`, `sz` (reload config), `docs`  
**SSH Integration:** `vd` → SSH + auto-cd to vadimcastro.me

📖 **Complete Reference:** `/Users/vadimcastro/vadimOS.md`  
🔧 **Live Config:** `/Users/vadimcastro/.zshrc`  
🏗️ **Infrastructure:** `/Users/vadimcastro/Desktop/PROJECTS/vadimOS/`  
⚙️ **Claude Config:** `.claude/settings.local.json` (100+ permissions)
