import { z } from "zod";

export const applicationStatusSchema = z.enum([
  "SAVED",
  "APPLIED",
  "INTERVIEWING",
  "OFFER",
  "REJECTED",
]);

export const createApplicationSchema = z.object({
  company: z.string().trim().min(1, "Company is required"),
  role: z.string().trim().min(1, "Role is required"),
  jobUrl: z.string().url("Invalid job URL").optional(),
  location: z.string().trim().optional(),
  status: applicationStatusSchema.optional(),
  jobDescription: z.string().optional(),
  notes: z.string().optional(),
});

export const updateApplicationSchema = createApplicationSchema.partial();

export const listApplicationsQuerySchema = z.object({
  search: z.string().trim().optional(),
  status: applicationStatusSchema.optional(),
  sort: z.enum(["newest", "oldest", "company"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
});

export const applicationParamsSchema = z.object({
  id: z.string().min(1, "Application id is required"),
});

export type ApplicationStatusInput = z.infer<typeof applicationStatusSchema>;
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type ListApplicationsQuery = z.infer<typeof listApplicationsQuerySchema>;
