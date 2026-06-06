"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationNotFoundError = void 0;
const base_error_1 = require("./base.error");
class ApplicationNotFoundError extends base_error_1.BaseError {
    constructor() {
        super("APPLICATION_NOT_FOUND", "Application not found", 404);
    }
}
exports.ApplicationNotFoundError = ApplicationNotFoundError;
