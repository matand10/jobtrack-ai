"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailOrPasswordError = void 0;
const base_error_1 = require("./base.error");
class InvalidEmailOrPasswordError extends base_error_1.BaseError {
    constructor() {
        super("AUTH_INVALID_CREDENTIALS", "Invalid email or password", 401);
    }
}
exports.InvalidEmailOrPasswordError = InvalidEmailOrPasswordError;
