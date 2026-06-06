# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**JobTrack AI** is a full-stack MVP for job seekers to track job applications and generate AI resume/cover letter suggestions. The codebase is organized as a monorepo with three workspaces:

- **client**: Vite + React + TypeScript + Tailwind frontend
- **server**: Express + TypeScript + Prisma backend
- **shared**: Shared types and utilities (used by both client and server)

## Development Setup

### First-time setup

```bash
# Install dependencies for all workspaces
npm install  # in client/
npm install  # in server/
npm install  # in shared/
```

### Environment variables

**Server (.env or .env.local in server/):**
```
DATABASE_URL=postgresql://user:password@host/dbname
JWT_SECRET=your-secret-key-min-32-chars
NODE_ENV=development
PORT=3000
AI_API_KEY=sk-...  # For resume/cover letter generation
```

**Client (.env in client/):**
```
VITE_API_BASE_URL=http://localhost:3000/api
```

### Running the application

**Complete dev setup (recommended):**
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend  
cd client && npm run dev

# Both servers auto-rebuild when shared types change
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```

**Frontend (from client/ directory):**
```bash
npm run dev         # Start Vite dev server (port 5173)
npm run build       # Build for production
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

**Backend (from server/ directory):**
```bash
npm run dev         # Start Express server with hot reload via tsx
npm run build       # Compile TypeScript to dist/
npm run start       # Run compiled server (production)
npm run generate    # Generate Prisma client (run after schema.prisma changes)
```

**Shared (from shared/ directory):**
```bash
npm run build       # Compile TypeScript to dist/
```

### Key behaviors to note

- **client** `predev` and `prebuild` scripts automatically build shared before starting
- **server** `predev` and `prebuild` scripts automatically build shared and generate Prisma client
- Shared package must be built whenever types change before client/server will see updates
- Changes to `shared/` types require rebuilding shared before client/server will detect them
- Database migrations are applied automatically on server startup if using Prisma

## Architecture

### Backend (Express + Prisma + TypeScript)

**Directory structure:**
- `src/app.ts` - Express app setup
- `src/server.ts` - Server entry point
- `src/routes/` - Route definitions (define URLs only)
- `src/controllers/` - Request/response handlers
- `src/BL/` - Business logic layer
- `src/DAL/` - Data access layer (Prisma interactions)
- `src/schemas/` - Zod validation schemas
- `src/middleware/` - Auth, error handling, not-found
- `src/config/` - Environment and Prisma configuration
- `src/utils/` - JWT, response formatting, cookies
- `src/errors/` - Custom error classes
- `src/types/` - TypeScript type augmentations

**Key patterns:**
- Routes define URLs only; controllers handle request/response
- All input validated with Zod schemas before processing
- Auth middleware checks JWT tokens and attaches user to `req.user`
- All application routes must check user ownership
- Custom error classes extend `BaseError` and are caught by error middleware
- Consistent JSON responses via `response.utils.ts`
- Never expose `passwordHash` or AI API keys in responses

### Frontend (Vite + React + TypeScript + Tailwind)

**Directory structure:**
- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/routes/` - Route definitions
- `src/api/` - Axios instances and API calls
- `src/auth/` - Auth state and context
- `src/hooks/` - Custom hooks
- `src/lib/` - Utilities
- `src/types/` - TypeScript types
- `src/assets/` - Static assets

**Key patterns:**
- Use React Query (TanStack Query) for server state
- Use React Hook Form + Zod for client-side form validation
- Use local state first, then lift if needed
- Components stay reusable but not over-abstracted
- API URLs should be configurable (avoid hardcoding)
- Responsive desktop/mobile layout via Tailwind

### Shared

The `@jobtrack/shared` package exports:
- Common types and schemas
- Shared validation logic (Zod schemas)
- Any code used by both client and server

## Stack Details

**Frontend dependencies:**
- React 19, React Router, React Hook Form, Zod, React Query
- Tailwind CSS 4, Radix UI (dropdowns), Axios

**Backend dependencies:**
- Express 5, Prisma 7 with PostgreSQL adapter
- JWT for auth, bcryptjs for passwords
- TypeScript 6

**Database:**
- PostgreSQL via Neon (in production)
- Prisma for ORM and migrations

## What Not To Do

Do not add without explicit request:
- Next.js, GraphQL, tRPC, Redux
- Microservices, Payments, Teams, Admin panel
- Email reminders, Calendar sync, Drag/drop, PDF parsing
- Native mobile app

Do not:
- Rewrite large files without asking
- Add dependencies without explaining why
- Store plain passwords (use bcryptjs)
- Expose sensitive data (passwordHash, API keys)
- Create big one-file pages if easy to split
- Use Redux or Next.js
- Hardcode backend URLs outside config
- Write business logic inside route files
- Use raw SQL unless absolutely needed

Prefer small, clear, focused changes over large refactors.

## Common Development Workflows

### Adding a new API endpoint
1. Create route in `server/src/routes/`
2. Create controller in `server/src/controllers/`
3. Add Zod schema validation in `server/src/schemas/`
4. Add DAL function in `server/src/DAL/` if database access needed
5. Update shared types in `shared/src/types/` if needed
6. Call from frontend via `client/src/api/`

### Adding a new database entity
1. Update `server/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name describe_change` (creates migration)
3. Run `npm run generate` in server/ to regenerate Prisma client
4. Create DAL functions in `server/src/DAL/`
5. Expose via API endpoints
6. Update shared types if used by client

### Updating shared types
1. Modify `shared/src/types/` or `shared/src/schemas/`
2. Run `npm run build` in shared/
3. Client and server will automatically rebuild and pick up changes
4. If types in `@jobtrack/shared` package, ensure npm link or local package reference works

## Troubleshooting

### Backend won't start / PORT 3000 in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or change PORT in .env
```

### Types not updating in client/server
1. Ensure shared was built: `cd shared && npm run build`
2. If still not detected, clear node_modules/.cache or restart dev server
3. Check that `predev` scripts ran (should see "Building shared..." message)

### Database connection errors
- Verify DATABASE_URL is correct in `.env`
- Check PostgreSQL is running
- Run `npx prisma db push` to sync schema (development only)

### Shared package import errors
- Verify `shared/package.json` has `"main": "dist/index.js"`
- Ensure `shared/src/index.ts` exports all needed types
- Rebuild shared: `cd shared && npm run build`

### Hot reload not working
- Kill dev server and restart (`npm run dev`)
- Check that file changes trigger rebuild (watch mode should be active)
- Verify tsx is installed: `npm list tsx` in server/

## Testing & Validation

### Type checking
```bash
# Frontend
cd client && npx tsc --noEmit

# Backend  
cd server && npx tsc --noEmit

# Shared
cd shared && npx tsc --noEmit
```

### Linting
```bash
cd client && npm run lint  # ESLint
```

### Manual API testing
- Use Postman, Insomnia, or curl
- Get JWT token from `/auth/login` endpoint
- Include in Authorization header: `Bearer <token>`
- Backend validates all requests via Auth middleware

## Performance Notes

- Frontend builds with Vite are fast (~2-5s)
- Backend hot reload via tsx is instant
- Database queries use Prisma (watch for N+1 queries)
- Frontend uses React Query for server state caching
- No server-side rendering; client is SPA at localhost:5173

## Architecture Decisions

- **Why monorepo?** Shared types reduce duplication and API contract drift
- **Why Prisma?** Type-safe DB access, auto migrations, good DX
- **Why Express?** Lightweight, flexible routing, easy middleware
- **Why React Query?** Server state management without Redux boilerplate
- **Why Zod?** Runtime validation + TypeScript inference for schemas
