# Gemini CLI - Project Reference & Task List

## 🛠️ Project Context
- **Frontend**: Next.js 14 (App Router)
- **Backend**: FastAPI (Python 3.11)
- **Status**: Transitioning from personal "vadimOS" integration to a standalone portable project.

## 🧹 De-personalization Checklist
- [x] **Makefile**: Removed vadimOS branding and hardcoded production IP/aliases.
- [x] **Docker**: Fixed `docker-compose.dev.ultra.yml` (removed `../../vadimOS` refs).
- [x] **Scripts**: Removed redundant `droplet-bashrc`.
- [x] **Documentation**: Fixed `README.md` and consolidated all docs into `docs/`.
- [x] **Shell**: Removed `.zshrc`.
- [x] **Environment**: Updated `.env.development` to use `admin@vadimcastro.me`.

## 🏗️ Architecture & Infrastructure Changes

### 1. Service Layer Abstraction (`backend/app/services/`)
- **What**: Created `SystemService` to handle all non-database logic (OS stats, Docker status, Network I/O).
- **Why**: 
    - **Reliability**: Prevents "Connection Pool Starvation" by not holding DB sessions open while waiting for shell commands/OS calls.
    - **Portability**: Allows system health checks even if the database is offline.

### 2. Docker & Build Optimization
- **Faster Startup**: Removed `npm ci` from the frontend `Dockerfile.dev`. It now relies on the volume-mounted `node_modules`, saving 1-2 minutes per restart.
- **Reliable Networking**: Fixed `NEXT_PUBLIC_API_URL` and volume mounts in `docker-compose.dev.yml` to ensure the frontend and API communicate correctly.
- **Unified Entrypoints**: Standardized on `start-api.sh` and fixed shebang (LF) issues that caused `exec format errors`.

### 3. Database & Auth Reliability
- **Alembic Restoration**: Added missing `env.py` to allow standard migrations.
- **User Lookup Fix**: Updated the JWT dependency resolver to use Email (string) instead of ID (int).
- **CRUD Standard**: Inherited `CRUDUser` from `CRUDBase` for standardized data access.

## 🚀 Modernization Goals (Completed)
- [x] **Doc Consolidation**: Created a single source of truth in `README.md` + `docs/`.
- [x] **Performance**: Optimized Docker builds and startup logic.
- [x] **CRUD Standardization**: Updated `CRUDUser` to inherit from `CRUDBase`.

## 📅 Future Work & TODO

### 1. Pydantic 2.0+ Upgrades 🚀
- [ ] **Model Migration**: Audit all Pydantic models in `backend/app/schemas/`.
- [ ] **Method Updates**: Replace `.dict()` with `.model_dump()` and `.json()` with `.model_dump_json()`.
- [ ] **Config Update**: Update `class Config` to `model_config = ConfigDict(...)`.
- [ ] **Validation**: Move from `v1.validator` to `v2.field_validator`.

### 2. Alembic & DB Reliability 🗄️
- [ ] **Alembic Standardization**: Transition fully to `alembic upgrade head` for all environments, eventually retiring the custom `migrate.sh`.
- [ ] **Schema Audit**: Ensure all models (User, Project, Note, etc.) are perfectly synced with Alembic's `autogenerate` capability.

### 3. Developer Experience (DX) ✨
- [ ] **TypeScript Generation**: Implement a script to generate frontend types from the FastAPI OpenAPI JSON.
- [ ] **Live Metrics**: Explore adding WebSockets for real-time dashboard updates.
- [ ] **Background Health**: Add a background task to monitor disk/system health and log alerts.

## 📝 Ongoing Observations
- [x] Fixed `migrate.sh` and `start-api.sh` shebangs.
- [x] Resolved JWT user lookup bug (int vs str email).
- [x] Cleaned up all "vadimOS" artifacts and legacy LLM files.
- [x] Fixed Disk Metrics payload mismatch for frontend.
