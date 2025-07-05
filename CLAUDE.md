# VadimCastro.me Development Environment

## 🚀 Quick Start

### Local Development
```bash
make dev              # Start all services locally
make setup-local-auth # First-time auth setup
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

## 🌐 Production Environment
- **Frontend**: http://206.81.2.168:3000
- **API**: http://206.81.2.168:8000
- **Status**: ✅ Operational
- **Branch**: `master`

## ⚡ Terminal Workflow

### Quick Navigation & Git
```bash
vc                    # Navigate to vadimcastro.me project
dlm                   # Navigate to photo gallery project  
gs                    # Git status
gcp "message"         # Add, commit, push in one command
glog                  # Show last commit
d                     # SSH to droplet
v                     # SSH to droplet + CD to vadimcastro.me
home                  # Go to home directory
..                    # Go up one directory
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

## 🖥️ vadimOS Integration



















































































































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
**Project Navigation:** `vc` → auto-navigate here  
**Development:** `gs`, `gcp "msg"`, `glog`, `dev`, `deploy`  
**Production:** `quick-deploy`, `deploy-clean`, `logs`, `d` (SSH droplet)  
**Utilities:** `kd`, `shortcuts`, `sz` (reload config)  
**SSH Integration:** `v` → SSH + auto-cd to vadimcastro.me

📖 **Complete Reference:** `/Users/vadimcastro/vadimOS.md`  
🔧 **Live Config:** `/Users/vadimcastro/.zshrc`  
🏗️ **Infrastructure:** `/Users/vadimcastro/Desktop/PROJECTS/vadimOS/`  
⚙️ **Claude Config:** `.claude/settings.local.json` (100+ permissions)
