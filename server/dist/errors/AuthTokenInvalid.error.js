"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenInvalidError = void 0;
const base_error_1 = require("./base.error");
class AuthTokenInvalidError extends base_error_1.BaseError {
    constructor() {
        super("AUTH_TOKEN_INVALID", "Invalid authentication token", 401);
    }
}
exports.AuthTokenInvalidError = AuthTokenInvalidError;
