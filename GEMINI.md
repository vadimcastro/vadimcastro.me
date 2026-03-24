# Gemini CLI - Project Reference & Task List

## 🛠️ Project Context
- **Frontend**: Next.js 14 (App Router)
- **Backend**: FastAPI (Python 3.11)
- **Status**: Transitioning from personal "vadimOS" integration to a standalone portable project.

## 🧹 De-personalization Checklist
- [x] **Makefile**: Removed vadimOS branding and hardcoded production IP/aliases.
- [x] **Docker**: Fixed `docker-compose.dev.ultra.yml` comments (removed `../../vadimOS` refs).
- [x] **Scripts**: Removed redundant `droplet-bashrc`.
- [x] **Documentation**: Fixed `README.md` encoding and consolidated all docs into `docs/`.
- [x] **Shell**: Removed `.zshrc`.
- [x] **Environment**: Updated `.env.development` to use `admin@vadimcastro.me`.

## 🚀 Modernization Goals
- [x] **Doc Consolidation**: Created a single source of truth in `README.md` + `docs/`.
- [ ] **Docker Relocation**: Move `Dockerfiles` from `docker/` to `backend/` and `frontend/` (Researching impact).
- [ ] **Alembic Standardization**: Restore standard Alembic migrations over the custom `migrate.sh`.
- [ ] **Dependency Cleanup**: Unify and clean up backend `requirements.txt`.
- [ ] **CRUD Pattern**: Standardize CRUD logic in the backend.

## 📝 Ongoing Observations
- [x] Fixed `migrate.sh` shebang issue.
- [x] Successfully initialized database with correct admin credentials.
- [x] CORS updated to exclude old production IP.
