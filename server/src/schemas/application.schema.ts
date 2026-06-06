import { z } from "zod";

// Core schemas and types are defined in @jobtrack/shared and re-exported here.
export {
  applicationStatusSchema,
  createApplicationSchema,
  updateApplicationSchema,
} from "@jobtrack/shared";

export type {
  ApplicationStatus,
  CreateApplicationInput,
  UpdateApplicationInput,
} from "@jobtrack/shared";

// Server-only schemas (not needed by client).
export const listApplicationsQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: z
    .enum(["SAVED", "APPLIED", "INTERVIEWING", "OFFER", "REJECTED"])
    .optional(),
  sort: z.enum(["newest", "oldest", "company"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export const applicationParamsSchema = z.object({
  id: z.string().min(1, "Application id is required"),
});

export type ListApplicationsQuery = z.infer<typeof listApplicationsQuerySchema>;
