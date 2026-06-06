import { z } from "zod";
export declare const applicationStatusSchema: z.ZodEnum<{
    SAVED: "SAVED";
    APPLIED: "APPLIED";
    INTERVIEWING: "INTERVIEWING";
    OFFER: "OFFER";
    REJECTED: "REJECTED";
}>;
export declare const createApplicationSchema: z.ZodObject<{
    company: z.ZodString;
    role: z.ZodString;
    jobUrl: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        SAVED: "SAVED";
        APPLIED: "APPLIED";
        INTERVIEWING: "INTERVIEWING";
        OFFER: "OFFER";
        REJECTED: "REJECTED";
    }>>;
    jobDescription: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateApplicationSchema: z.ZodObject<{
    company: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    jobUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    location: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        SAVED: "SAVED";
        APPLIED: "APPLIED";
        INTERVIEWING: "INTERVIEWING";
        OFFER: "OFFER";
        REJECTED: "REJECTED";
    }>>>;
    jobDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
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
