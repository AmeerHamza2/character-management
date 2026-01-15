# Character Management Application

A full-stack Character Management Application using Next.js for the frontend and NestJS for the backend with GraphQL end-to-end.

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **GraphQL** (Apollo Server) - API layer
- **Prisma** - ORM
- **PostgreSQL** - Database

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **React Query** - Data fetching and caching
- **nuqs** - URL state management
- **Tailwind CSS 3** - Styling

---

## Prerequisites

### For Docker Setup (Recommended)
- **Docker** - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** - Included with Docker Desktop

### For Local Development (Without Docker)
- **Node.js 18+** - [Install Node.js](https://nodejs.org/)
- **PostgreSQL 16** - [Install PostgreSQL](https://www.postgresql.org/download/)
  - Mac: `brew install postgresql@16 && brew services start postgresql@16`
  - Ubuntu: `sudo apt install postgresql`
  - Windows: Download from official site

---

## Quick Start with Docker

### Three Docker Compose Files

| File | Purpose | Use Case |
|------|---------|----------|
| `docker-compose.local.yml` | Local development | Hot-reload, volume mounts for live editing |
| `docker-compose.dev.yml` | Dev/Staging server | Built images, no volume mounts |
| `docker-compose.prod.yml` | Production | Optimized builds, production settings |

---

### Local Development (Recommended for coding)

```bash
docker-compose -f docker-compose.local.yml up --build
```

**Features:**
- ✅ Hot-reload enabled (code changes reflect instantly)
- ✅ Volume mounts (edit files locally)
- ✅ Auto migrations and seeding
- ✅ Debug-friendly

**Stop:**
```bash
docker-compose -f docker-compose.local.yml down
```

---

### Dev/Staging Environment

```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Features:**
- ✅ Built Docker images (no volume mounts)
- ✅ Auto migrations and seeding
- ✅ Auto-restart on failure

**Stop:**
```bash
docker-compose -f docker-compose.dev.yml down
```

---

### Production Environment

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

**Features:**
- ✅ Optimized production builds
- ✅ Multi-stage Docker builds (smaller images)
- ✅ Auto-restart always
- ✅ Runs in background (-d)

**Stop:**
```bash
docker-compose -f docker-compose.prod.yml down
```

---

## Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| GraphQL Playground | http://localhost:3001/graphql |
| PostgreSQL | localhost:5432 |

---

## What Happens on Startup

When you run any docker-compose command:

1. **PostgreSQL** starts and becomes healthy
2. **Backend** waits for PostgreSQL
3. **Migrations** run automatically
4. **Seeder** populates 25 test characters
5. **Backend** starts (port 3001)
6. **Frontend** starts (port 3000)

All automated - no manual steps needed!

---

## Useful Commands

```bash
# View logs
docker-compose -f docker-compose.local.yml logs -f
docker-compose -f docker-compose.local.yml logs -f backend
docker-compose -f docker-compose.local.yml logs -f frontend

# Restart a service
docker-compose -f docker-compose.local.yml restart backend

# Reset database (delete volumes)
docker-compose -f docker-compose.local.yml down -v
docker-compose -f docker-compose.local.yml up --build

# Enter container shell
docker exec -it character-backend-local sh
docker exec -it character-frontend-local sh

# Check running containers
docker-compose -f docker-compose.local.yml ps
```

---

## Project Structure

```
character-management/
├── docker-compose.local.yml    # Local dev (hot-reload)
├── docker-compose.dev.yml      # Dev/Staging
├── docker-compose.prod.yml     # Production
├── .env.example                # Environment template
│
├── backend/
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   ├── .dockerignore
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── src/
│       ├── character/
│       └── prisma/
│
└── frontend/
    ├── Dockerfile
    ├── .dockerignore
    └── src/
        ├── app/
        ├── components/
        ├── hooks/
        └── graphql/
```

---

## Environment Variables

### For Docker

Copy root `.env.example` to `.env` (optional - defaults are set):

```bash
cp .env.example .env
```

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=character_management
SEED_DB=true
```

### For Local Development (Without Docker)

**Backend** - Copy `backend/.env.example` to `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/character_management?schema=public"
PORT=3001
```

**Frontend** - Copy `frontend/.env.example` to `frontend/.env.local`:

```bash
cp frontend/.env.example frontend/.env.local
```

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
```

---

## GraphQL API

### Get Characters
```graphql
query GetCharacters($filter: CharacterFilterInput) {
  characters(filter: $filter) {
    id
    image
    name
    status
    gender
    description
  }
}
```

### Filter Options
```graphql
input CharacterFilterInput {
  status: Status      # ALIVE, DEAD, UNKNOWN
  gender: Gender      # MALE, FEMALE, UNKNOWN
  search: String      # Text search
}
```

### Example
```graphql
{
  characters(filter: { status: ALIVE, gender: FEMALE }) {
    name
    status
    gender
  }
}
```

---

## Testing Checklist

After running `docker-compose -f docker-compose.local.yml up --build`:

1. ✅ Open http://localhost:3000 → 25 characters displayed
2. ✅ Status filter → Only matching characters
3. ✅ Gender filter → Only matching characters
4. ✅ Search "wizard" → Finds Gandalf
5. ✅ URL updates → `?status=ALIVE&search=wizard`
6. ✅ Refresh page → Filters persist
7. ✅ GraphQL Playground → http://localhost:3001/graphql

---

## Manual Setup (Without Docker)

Requires PostgreSQL running locally.

### 1. Setup Environment Files

```bash
# Backend - REQUIRED before running migrations
cd backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env.local
```

Update `backend/.env` with your PostgreSQL credentials if different:
```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/character_management?schema=public"
```

### 2. Create Database

Create the database in PostgreSQL:
```bash
createdb character_management
```

Or via psql:
```sql
CREATE DATABASE character_management;
```

### 3. Start Backend

```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```

### 4. Start Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```
