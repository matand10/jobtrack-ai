import type { CookieOptions, Response } from "express";

const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export const AUTH_COOKIE_NAME = process.env.COOKIE_NAME || "jobtrack_token";

export function getAuthCookieOptions(): CookieOptions {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/",
    maxAge: SEVEN_DAYS_IN_MS,
  };
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
}

export function clearAuthCookie(res: Response) {
  const { maxAge, ...options } = getAuthCookieOptions();
  void maxAge;
  res.clearCookie(AUTH_COOKIE_NAME, options);
}
