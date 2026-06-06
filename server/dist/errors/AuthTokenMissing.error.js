"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenMissingError = void 0;
const base_error_1 = require("./base.error");
class AuthTokenMissingError extends base_error_1.BaseError {
    constructor() {
        super("AUTH_TOKEN_MISSING", "Authentication token is required", 401);
    }
}
exports.AuthTokenMissingError = AuthTokenMissingError;
