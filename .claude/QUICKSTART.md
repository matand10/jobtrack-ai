# JobTrack AI — Quick Execution Guide

This is the operational skill for executing JobTrack AI. Use these commands to rapidly set up and run the project.

## One-time setup
```bash
npm install  # in each of: client/, server/, shared/
# Add .env to server/ with DATABASE_URL and JWT_SECRET
# Add .env to client/ with VITE_API_BASE_URL
```

## Run the full dev environment
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
cd client && npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:3000/api
```

## Rapid development tasks

| Task | Command | Notes |
|------|---------|-------|
| Fix shared types | `cd shared && npm run build` | Client/server auto-rebuild after |
| Add DB entity | Update `schema.prisma` → `npx prisma migrate dev` | Auto-applies on server restart |
| Add API route | Create in `routes/` → `controllers/` → `schemas/` → `DAL/` | Validate with Zod |
| Check types | `cd <dir> && npx tsc --noEmit` | No build needed |
| Lint frontend | `cd client && npm run lint` | ESLint rules |
| Kill stuck port | `lsof -ti:3000 \| xargs kill -9` | If port already in use |

## Code organization rules
- **Routes** define URLs only
- **Controllers** handle request/response
- **DAL** does all Prisma queries
- **Schemas** validate input (Zod)
- **Shared** has all types and contracts

## Testing patterns
- Manual API: Postman/curl + `Bearer <token>`
- Type safety: `npx tsc --noEmit` in each workspace
- Frontend verification: Use `/verify` skill to test in browser

## Key files to know
- Backend routes: `server/src/routes/`
- Backend business logic: `server/src/BL/`
- Frontend pages: `client/src/pages/`
- Shared types: `shared/src/types/`
- Database schema: `server/prisma/schema.prisma`

---

**See CLAUDE.md for full architectural details, troubleshooting, and design rationale.**
