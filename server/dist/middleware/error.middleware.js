"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const zod_1 = require("zod");
const base_error_1 = require("../errors/base.error");
function errorMiddleware(err, _req, res, _next) {
    console.error(err);
    if (err instanceof zod_1.ZodError) {
        const errors = err.issues.reduce((acc, issue) => {
            const field = issue.path.join(".");
            if (field && !acc[field]) {
                acc[field] = issue.message;
            }
            return acc;
        }, {});
        return res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            errors,
        });
    }
    if (err instanceof base_error_1.BaseError) {
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message,
            details: err.details,
        });
    }
    return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
    });
}
