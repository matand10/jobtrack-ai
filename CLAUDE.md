# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JobTrack AI** is a full-stack MVP for job seekers to track job applications and generate AI resume/cover letter suggestions. Three independent npm packages — no root `package.json`, no npm workspaces:

```
client/   server/   shared/
```

Run `npm install` separately in each. `@jobtrack/shared` is referenced as `"file:../shared"`, so `shared/dist/` must exist before client or server can import it.

## Environment Variables

**server/.env:**
```
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your-secret-key-min-32-chars
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
AI_API_KEY=sk-...
```

**client/.env:**
```
VITE_API_URL=http://localhost:4000/api
```

## Dev Commands

```bash
# Terminal 1: Backend (from server/)
npm run dev       # builds shared + runs prisma generate, then tsx watch src/server.ts

# Terminal 2: Frontend (from client/)
npm run dev       # builds shared, then vite → http://localhost:5173
```

`predev` and `prebuild` scripts handle the shared build automatically. If running steps manually, build shared first:

```bash
cd shared && npm run build
```

**Other commands:**
```bash
# Type checking (no test suite exists)
cd client && npx tsc --noEmit
cd server && npx tsc --noEmit
cd shared && npx tsc --noEmit

# Lint
cd client && npm run lint

# Prisma (run from server/)
npx prisma migrate dev --name describe_change   # after editing schema.prisma
npm run generate                                 # regenerate Prisma client
```

## Backend Architecture

**Layer pattern: Routes → Controllers → BL → DAL** — always go through BL; never call DAL directly from controllers.

| Layer | Location | Responsibility |
|---|---|---|
| Routes | `src/routes/` | URL definitions only |
| Controllers | `src/controllers/` | Parse/validate request, call BL, call `sendSuccess` |
| BL | `src/BL/` | Business rules, ownership enforcement |
| DAL | `src/DAL/` | Prisma queries only |
| Schemas | `src/schemas/` | Zod validation + inferred types |
| Errors | `src/errors/` | Extend `BaseError`; caught by error middleware |

**Auth:**
- **httpOnly cookies only** — no `Authorization` header.
- Client sends `withCredentials: true` globally (configured in `client/src/api/client.ts`).
- Auth middleware reads JWT from cookie → sets `req.userId` on the request.
- All application routes must verify `userId` ownership.

## Frontend Architecture

**Atomic Design under `client/src/components/ui/`:**

| Level | Directory | What belongs here |
|---|---|---|
| Atoms | `ui/atoms/` | Single-purpose, no composition — Button, Input, Badge, Card |
| Molecules | `ui/molecules/` | Small groups of atoms with one job — FormField, ErrorAlert, StatusBadge |
| Organisms | `ui/organisms/` | Self-contained sections composed of molecules/atoms |

Pages (`src/pages/`) and layout wrappers (`src/components/layout/`) compose organisms and molecules — they are not part of the `ui/` hierarchy. When adding a UI element that doesn't exist, create a component at the correct atomic level rather than inlining markup.

**Other patterns:**
- React Query (TanStack Query) for server state
- React Hook Form + Zod for forms
- Routing is defined in `App.tsx` (`src/routes/AppRoute.tsx` is empty)

## Shared Package

`shared/src/` currently exports **auth types only**. Application types live server-side in `server/src/schemas/application.schema.ts` — not yet promoted to shared.

## Current Implementation Status

| Feature | Backend | Frontend |
|---|---|---|
| Auth (register / login / me / logout) | Complete | Complete |
| Applications CRUD | Complete (full REST API) | In progress |
| Dashboard stats | — | Partially hardcoded |
| AI tailoring | `TailorResult` Prisma model only — no routes/BL/DAL | Not started |

## Known Gotchas

- `server/src/config/env.ts` is empty — no centralized env validation exists yet.
- `client/src/routes/AppRoute.tsx` is empty — routing is defined directly in `App.tsx`.
- CLAUDE.md previously listed PORT as 3000 and env var as `VITE_API_BASE_URL` — both are wrong. Port is **4000** and var is **`VITE_API_URL`**.

## What Not To Do

Do not add without explicit request:
- Next.js, GraphQL, tRPC, Redux, Zustand (unless truly needed)
- Microservices, Payments, Teams, Admin panel
- Email reminders, Calendar sync, Drag/drop Kanban, PDF parsing, Native mobile app

Do not:
- Rewrite large files without asking
- Add dependencies without explaining why
- Expose `passwordHash` or `AI_API_KEY` in responses
- Call DAL directly from controllers (always go through BL)
- Write business logic inside route files
- Hardcode backend URLs outside config
- Use raw SQL unless absolutely needed

## Common Workflows

### Adding a new API endpoint
1. Create route in `server/src/routes/`
2. Create controller in `server/src/controllers/`
3. Add Zod schema in `server/src/schemas/`
4. Add BL function in `server/src/BL/`
5. Add DAL function in `server/src/DAL/`
6. Update shared types in `shared/src/` if needed, then rebuild shared
7. Call from frontend via `client/src/api/`

### Adding a new database entity
1. Update `server/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name describe_change` from `server/`
3. Run `npm run generate` in `server/`
4. Create DAL → BL → Controller → Route layers
5. Promote types to `shared/` if client needs them
