"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const shared_1 = require("@jobtrack/shared");
const auth_bl_1 = require("../BL/auth.bl");
const response_utils_1 = require("../utils/response.utils");
const Unauthorized_error_1 = require("../errors/Unauthorized.error");
const cookie_1 = require("../utils/cookie");
class AuthController {
    async register(req, res) {
        const input = shared_1.registerSchema.parse(req.body);
        const { user, token } = await auth_bl_1.authBL.register(input);
        (0, cookie_1.setAuthCookie)(res, token);
        (0, response_utils_1.sendSuccess)(res, { user }, 201);
    }
    async login(req, res) {
        const input = shared_1.loginSchema.parse(req.body);
        const { user, token } = await auth_bl_1.authBL.login(input);
        (0, cookie_1.setAuthCookie)(res, token);
        (0, response_utils_1.sendSuccess)(res, { user });
    }
    async me(req, res) {
        if (!req.userId)
            throw new Unauthorized_error_1.UnauthorizedError();
        const result = await auth_bl_1.authBL.me(req.userId);
        return (0, response_utils_1.sendSuccess)(res, result);
    }
    async logout(_req, res) {
        (0, cookie_1.clearAuthCookie)(res);
        return (0, response_utils_1.sendSuccess)(res, { success: true });
    }
}
exports.authController = new AuthController();
