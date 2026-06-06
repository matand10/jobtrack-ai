Use Vite + React + TypeScript + Tailwind.
Structure:

- src/pages
- src/components
- src/layouts
- src/routes
- src/lib
- src/types
  Patterns:
- Pages compose components
- Components stay reusable but not over-abstracted
- Use React Query for server data
- Use React Hook Form + Zod for forms
- Use local state first
- Use Zustand only if truly needed
- Keep generated UI code clean and readable
- Ensure responsive desktop/mobile layout
  Avoid:
- Redux
- Next.js
- Overly complex component abstractions
- Hardcoded backend URLs outside config
- Big one-file pages if easy to split
