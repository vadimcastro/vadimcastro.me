# VadimCastro.me Development Environment

## 🚀 Quick Start

### Local Development
```bash
make dev              # Start all services locally
make setup-local-auth # First-time auth setup
```

### Production Deployment
```bash
make droplet-deploy           # One-command deployment
make set-branch branch=NAME   # Configure deployment branch
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
make droplet-deploy                # Deploy to production
make set-branch branch=BRANCH      # Set deployment branch
make show-branch                   # Show current branch config
```

### Database
```bash
make migrate                       # Run migrations
make migrate-create name=NAME      # Create new migration
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

### 🔄 Branch Management
```bash
# Deploy current branch
make droplet-deploy                             # Deploy current git branch
make deploy                                     # Deploy current branch (when SSH'd)

# Deploy specific branch
make droplet-deploy branch=main                 # Deploy specific branch
make deploy branch=main                         # Deploy specific branch (when SSH'd)
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