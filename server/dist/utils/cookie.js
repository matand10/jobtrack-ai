"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_COOKIE_NAME = void 0;
exports.getAuthCookieOptions = getAuthCookieOptions;
exports.setAuthCookie = setAuthCookie;
exports.clearAuthCookie = clearAuthCookie;
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
exports.AUTH_COOKIE_NAME = process.env.COOKIE_NAME || "jobtrack_token";
function getAuthCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: SEVEN_DAYS_IN_MS,
    };
}
function setAuthCookie(res, token) {
    res.cookie(exports.AUTH_COOKIE_NAME, token, getAuthCookieOptions());
}
function clearAuthCookie(res) {
    const { maxAge, ...options } = getAuthCookieOptions();
    void maxAge;
    res.clearCookie(exports.AUTH_COOKIE_NAME, options);
}
