"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const base_error_1 = require("./base.error");
class UnauthorizedError extends base_error_1.BaseError {
    constructor() {
        super("AUTH_UNAUTHORIZED", "Unauthorized", 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
