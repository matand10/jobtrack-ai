import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { BaseError } from "../errors/base.error";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);

  if (err instanceof ZodError) {
    const errors = err.issues.reduce<Record<string, string>>((acc, issue) => {
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

  if (err instanceof BaseError) {
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
