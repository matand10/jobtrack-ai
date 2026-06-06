"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationParamsSchema = exports.listApplicationsQuerySchema = exports.updateApplicationSchema = exports.createApplicationSchema = exports.applicationStatusSchema = void 0;
const zod_1 = require("zod");
exports.applicationStatusSchema = zod_1.z.enum([
    "SAVED",
    "APPLIED",
    "INTERVIEWING",
    "OFFER",
    "REJECTED",
]);
exports.createApplicationSchema = zod_1.z.object({
    company: zod_1.z.string().trim().min(1, "Company is required"),
    role: zod_1.z.string().trim().min(1, "Role is required"),
    jobUrl: zod_1.z.string().url("Invalid job URL").optional(),
    location: zod_1.z.string().trim().optional(),
    status: exports.applicationStatusSchema.optional(),
    jobDescription: zod_1.z.string().optional(),
    notes: zod_1.z.string().optional(),
});
exports.updateApplicationSchema = exports.createApplicationSchema.partial();
exports.listApplicationsQuerySchema = zod_1.z.object({
    search: zod_1.z.string().trim().optional(),
    status: exports.applicationStatusSchema.optional(),
    sort: zod_1.z.enum(["newest", "oldest", "company"]).optional(),
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(50).default(10),
});
exports.applicationParamsSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Application id is required"),
});
