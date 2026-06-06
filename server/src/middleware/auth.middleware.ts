import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { AuthTokenInvalidError } from "../errors/AuthTokenInvalid.error";
import { AuthTokenMissingError } from "../errors/AuthTokenMissing.error";
import { AUTH_COOKIE_NAME } from "../utils/cookie";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const token = req.cookies?.[AUTH_COOKIE_NAME];

  if (!token) {
    throw new AuthTokenMissingError();
  }

  try {
    const payload = verifyToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    throw new AuthTokenInvalidError();
  }
}
