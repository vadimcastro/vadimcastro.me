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
- **Branch**: `feature/mobile-friendly`

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
| Project path | `/Users/vadimcastro/Desktop/PROJECTS/my_website/vadimcastro.me` | `/root/vadimcastro.me` |

### 📖 Complete Workflow Documentation
For comprehensive terminal workflow documentation, architectural decisions, and setup history, see: **[`~/vadimOS.md`](file:///Users/vadimcastro/vadimOS.md)**

The vadimOS.md file contains:
- Complete shell configuration templates
- Advanced alias recommendations  
- Project management utilities
- Shell optimization insights
- Deployment patterns and history

## 🎯 Current Development Focus

### ✅ Completed Features
- **Mobile-First Design**: Responsive UI across all pages
- **Unified Action Menus**: Reusable desktop/mobile components with sand/mint theming
- **Advanced Dashboard**: Real-time system metrics with expandable mobile interface
- **Authentication System**: JWT-based login with local dev setup
- **Production Deployment**: Automated deployment pipeline with branch management
- **Mobile-Optimized Image Modal**: Touch-friendly image viewer with pinch-to-zoom and double-tap controls

### 🔄 Branch Management
```bash
# Quick git workflow with aliases
vc                                              # Navigate to project (alias)
gs                                              # Git status (alias)
gcp "commit message"                            # Add, commit, push in one command (alias)
glog                                            # Show last commit (alias)

# Deploy current local branch (auto-syncs with droplet)
deploy                                          # Deploy current local branch to droplet (alias)
make deploy                                     # Deploy current branch (when SSH'd)

# Deploy specific branch
make droplet-deploy branch=main                 # Deploy specific branch to droplet
make deploy branch=main                         # Deploy specific branch (when SSH'd)

# Note: All droplet commands now automatically sync your local branch to the droplet
```

## 🎨 Frontend Architecture

### Action Menu System
**Components**: `MobileActionMenu`, `DesktopActionMenu`
- Touch-optimized floating buttons
- Auto-switching sand/mint theming
- Portal-based rendering with proper z-index
- TypeScript support with flexible APIs

```tsx
// Usage Example
<MobileActionMenu
  actions={getMobileActions()}
  isOpen={showActions}
  onClose={() => setShowActions(false)}
  theme="auto"
/>
```

### Mobile Image Modal System
**Component**: `ImageModal` (`frontend/src/components/projects/ImageModal.tsx`)
- **Touch-Based Zoom**: Native pinch-to-zoom with stability controls
- **Double-Tap Interaction**: Double-click/tap to zoom in/out (no single-click)
- **Pan & Drag**: Smooth dragging when zoomed in with movement bounds
- **Mobile-First**: No UI buttons, clean unobstructed image viewing
- **High Quality**: 95% image quality, responsive sizing

**Touch Features**:
- **Pinch-to-zoom**: Two-finger gesture with sensitivity damping
- **Double-tap zoom**: Toggle between 1x and 1.5x zoom levels
- **Bounded movement**: Image stays within ±150px of center when dragging
- **Page isolation**: Prevents background scrolling/interaction during use

**Desktop Features**:
- **Mouse wheel zoom**: Reduced sensitivity for smooth control
- **Double-click zoom**: Same behavior as mobile double-tap
- **Keyboard shortcuts**: `+`/`-` for zoom, `0` to reset, `ESC` to close
- **Drag to pan**: When zoomed in, with same movement bounds

**Stability**:
- Scale bounds: 1x (normal) to 3x maximum zoom
- Movement constraints prevent image disappearing off-screen
- Touch sensitivity damping prevents aggressive zoom jumps

### Design System
- **Typography**: Poppins (headings), Inter (body)
- **Mobile-first**: `px-2 md:px-4`, `text-xs md:text-sm`
- **Icons**: Lucide React icons
- **Spacing**: Consistent responsive margins

### Contact Information
- **Email**: vadimcastro1@gmail.com
- **Phone**: 914-222-0975
- **LinkedIn**: linkedin.com/in/vadimcastro
- **GitHub**: github.com/vadimcastro

## 📊 Dashboard Features

### System Metrics Dashboard
- **Real-time Monitoring**: CPU, memory, disk, network metrics
- **Mobile-First Design**: Responsive 1→6 column grid
- **Expandable Interface**: "Show X More" for compact display
- **Icon-Based Navigation**: Clean header design

### Backend Monitoring
- **API Endpoints**: `/api/v1/metrics/system`, `/metrics/network`, `/metrics/health`
- **Docker Integration**: Container status tracking
- **Performance Optimization**: Eliminated render loops

### Key Components
- `DashboardComponent.tsx` - Main dashboard interface
- `MetricCard.tsx` - Responsive metric display
- `Notepad.tsx` - Icon-only header with perfect alignment
- `CryptoPrice.tsx` - Mobile-friendly price display

## 🚀 Deployment Workflow

```bash
# 1. Development
git add . && git commit -m "feature: description"
git push origin feature/mobile-friendly

# 2. Deploy
make droplet-deploy

# 3. Verify
curl http://206.81.2.168:3000  # Frontend health check
```

### Troubleshooting
```bash
ssh root@206.81.2.168 'cd vadimcastro.me && docker compose -f docker/docker-compose.prod.yml logs -f'
make droplet-force-rebuild  # Force clean rebuild
```

### Pull Request
**Ready for merge**: `feature/mobile-friendly` → `master`
[Create PR](https://github.com/vadimcastro/vadimcastro.me/compare/master...feature/mobile-friendly)