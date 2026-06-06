"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsError = void 0;
const base_error_1 = require("./base.error");
class UserAlreadyExistsError extends base_error_1.BaseError {
    constructor() {
        super("AUTH_EMAIL_ALREADY_EXISTS", "User already exists", 409);
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
