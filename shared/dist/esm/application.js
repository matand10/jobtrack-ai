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
