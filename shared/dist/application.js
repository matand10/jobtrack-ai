"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationSchema = exports.createApplicationSchema = exports.applicationStatusSchema = void 0;
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
