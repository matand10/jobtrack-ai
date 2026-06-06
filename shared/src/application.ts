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

export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;

export type Application = {
  id: string;
  userId: string;
  company: string;
  role: string;
  jobUrl: string | null;
  location: string | null;
  status: ApplicationStatus;
  jobDescription: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApplicationPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ListApplicationsResponse = {
  applications: Application[];
  pagination: ApplicationPagination;
};

export type ListApplicationsParams = {
  search?: string;
  status?: ApplicationStatus;
  sort?: "newest" | "oldest" | "company";
  page?: number;
  limit?: number;
};

export type ApplicationStats = {
  total: number;
  saved: number;
  applied: number;
  interviewing: number;
  offers: number;
  rejected: number;
};
