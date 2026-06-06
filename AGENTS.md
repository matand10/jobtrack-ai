# AGENTS.md

> For full architectural detail, see `CLAUDE.md`. This file covers only what agents
> commonly miss or get wrong.

## Workspace layout

Three independent npm packages — no root `package.json`, no npm workspaces:

```
client/   server/   shared/
```

Run `npm install` separately in each. `@jobtrack/shared` is a local file reference
(`"file:../shared"`), so `shared/dist/` must exist before client or server can import it.

## Build order

`shared` must be built before client or server can use it.

`predev` and `prebuild` scripts in `client/` and `server/` handle this automatically
when you run `npm run dev` or `npm run build`. If invoking steps manually, build shared
first:

```bash
cd shared && npm run build
```

## Dev commands

```bash
# Backend (run from server/)
npm run dev       # builds shared + runs prisma generate, then: tsx watch src/server.ts

# Frontend (run from client/)
npm run dev       # builds shared, then: vite  →  http://localhost:5173
```

## Env vars

**server/.env**
```
DATABASE_URL=postgresql://...
JWT_SECRET=<min 32 chars>
PORT=4000                            # default in server/src/server.ts is 4000 (CLAUDE.md says 3000 — wrong)
CLIENT_ORIGIN=http://localhost:5173  # controls CORS allowed origin
AI_API_KEY=sk-...
```

**client/.env**
```
VITE_API_URL=http://localhost:4000/api  # CLAUDE.md says VITE_API_BASE_URL — wrong; code reads VITE_API_URL
```

## Backend layer pattern

**Routes → Controllers → BL → DAL** — always go through BL; never call DAL directly from controllers.

| Layer | Location | Responsibility |
|---|---|---|
| Routes | `src/routes/` | URL definitions only |
| Controllers | `src/controllers/` | Parse/validate request, call BL, call `sendSuccess` |
| BL | `src/BL/` | Business rules, ownership enforcement |
| DAL | `src/DAL/` | Prisma queries only |
| Schemas | `src/schemas/` | Zod validation + inferred types |
| Errors | `src/errors/` | Extend `BaseError`; caught by error middleware |

Never expose `passwordHash` or `AI_API_KEY` in responses.

## Auth

- **httpOnly cookies only** — no `Authorization` header.
- Client sends `withCredentials: true` globally (configured in `client/src/api/client.ts`).
- Auth middleware reads JWT from cookie → sets `req.userId` on the request.
- All application routes must verify `userId` ownership.

## Current implementation status

| Feature | Backend | Frontend |
|---|---|---|
| Auth (register / login / me / logout) | Complete | Complete |
| Applications CRUD | Complete (full REST API) | `PlaceholderPage` — not built |
| Dashboard stats | — | Hardcoded to 0 |
| AI tailoring | `TailorResult` Prisma model only — no routes/BL/DAL | Not started |

## Prisma workflow

After editing `server/prisma/schema.prisma`:

```bash
# Run from server/
npx prisma migrate dev --name describe_change   # creates migration file
npm run generate                                 # regenerates Prisma client
```

`npm install` in `server/` auto-runs `prisma generate` via `postinstall`.

## Validation — no test suite

No test files, no test runner, no CI, no pre-commit hooks exist.
Only automated validation is type checking:

```bash
cd client && npx tsc --noEmit
cd server && npx tsc --noEmit
cd shared && npx tsc --noEmit
```

Frontend build uses TypeScript project references: `tsc -b` (not `tsc --noEmit`).

## Frontend component system — Atomic Design

All UI components live under `client/src/components/ui/` and follow Atomic Design strictly:

| Level | Directory | What belongs here |
|---|---|---|
| Atoms | `ui/atoms/` | Single-purpose, no composition — Button, Input, Badge, Card |
| Molecules | `ui/molecules/` | Small groups of atoms with one job — FormField, ErrorAlert, StatusBadge |
| Organisms | `ui/organisms/` | Self-contained sections composed of molecules/atoms — HeroSection, FeaturesSection |

**When you need a UI element that doesn't already exist, create a new component rather than inlining markup.** Place it at the correct atomic level:

- If it is a primitive with no children components → atom
- If it composes atoms into a small reusable unit → molecule
- If it is a standalone page section or complex feature block → organism

Pages (`client/src/pages/`) and layout wrappers (`client/src/components/layout/`) compose organisms and molecules; they are not part of the `ui/` hierarchy.

## Gotchas

- `server/src/config/env.ts` is **empty** — no centralised env validation exists yet.
- `client/src/routes/AppRoute.tsx` is **empty** — routing is defined directly in `App.tsx`.
- `shared/src/` exports **auth types only**. Application types live server-only in
  `server/src/schemas/application.schema.ts` — not yet promoted to shared.
