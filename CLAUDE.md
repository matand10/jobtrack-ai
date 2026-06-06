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

### Running the application

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
npm run generate    # Generate Prisma client
```

**Shared (from shared/ directory):**
```bash
npm run build       # Compile TypeScript to dist/
```

### Key behaviors to note

- **client** `predev` and `prebuild` scripts automatically build shared before starting
- **server** `predev` and `prebuild` scripts automatically build shared and generate Prisma client
- Shared package must be built whenever types change before client/server will see updates

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
