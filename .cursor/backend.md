Use Express + TypeScript + Prisma.
Structure:

- src/app.ts
- src/server.ts
- src/routes
- src/controllers
- src/schemas
- src/middleware
- src/config
  Patterns:
- Routes define URLs only
- Controllers handle request/response
- Zod schemas validate input
- Prisma access should be clear and close to controller unless reused
- Use auth middleware for protected routes
- Check user ownership on all application routes
- Never expose passwordHash
- Never expose AI API key
- Use central error middleware
- Return consistent JSON responses
  Use CommonJS TypeScript config.
  Imports should not require .js extensions.
  Avoid:
- Business logic inside route files
- Raw SQL unless needed
- Any work without validation
- Storing plain passwords
- Frontend API keys
