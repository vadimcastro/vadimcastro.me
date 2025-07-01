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

## 🔧 Essential Commands

### Development
```bash
make dev              # Start development environment
make setup-local-auth # Configure local authentication
make logs             # View container logs
make clean            # Clean up environment
```

### Deployment
```bash
make droplet-deploy                           # Deploy current local branch to production
make droplet-deploy branch=BRANCH             # Deploy specific branch to production
make droplet-quick-deploy                     # ⚡ Fast deployment (uses cache)
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
ssh droplet                    # 🔗 Passwordless SSH access (via SSH key)
```

## 📁 Project Structure
```
├── frontend/     # Next.js application
├── backend/      # FastAPI application
├── docker/       # Docker configurations
└── scripts/      # Deployment & setup scripts
```

## 🎯 Current Development Focus

### ✅ Completed Features
- **Mobile-First Design**: Responsive UI across all pages
- **Unified Action Menus**: Reusable desktop/mobile components with sand/mint theming
- **Advanced Dashboard**: Real-time system metrics with expandable mobile interface
- **Authentication System**: JWT-based login with local dev setup
- **Production Deployment**: Automated deployment pipeline with branch management
- **Enhanced Image Modal**: Zoomable, high-quality image viewer with intuitive controls

### 🔄 Branch Management
```bash
# Deploy current local branch (auto-syncs with droplet)
make droplet-deploy                             # Deploy current local branch to droplet
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

### Image Modal System
**Component**: `ImageModal` (`frontend/src/components/projects/ImageModal.tsx`)
- **Interactive Zoom**: Mouse wheel, click-to-zoom, keyboard shortcuts (+/-/0)
- **Pan & Drag**: Drag to pan when zoomed in, smooth transforms
- **Mobile Optimized**: Touch-friendly, click-outside-to-close functionality
- **High Quality**: 95% image quality, responsive sizing
- **Clean Interface**: No close button needed, intuitive zoom controls

**Features**:
- Click image to zoom in/out toggle
- Scroll wheel for precise zoom control
- Keyboard shortcuts: `+`/`-` for zoom, `0` to reset, `ESC` to close
- Visual zoom controls with percentage display
- Automatic branch synchronization for deployments

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