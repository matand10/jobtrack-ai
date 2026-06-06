"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authBL = void 0;
const user_dal_1 = require("../DAL/user.dal");
const UserAlreadyExists_error_1 = require("../errors/UserAlreadyExists.error");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jws_utils_1 = require("../utils/jws.utils");
const InvalidEmailOrPassword_error_1 = require("../errors/InvalidEmailOrPassword.error");
const Unauthorized_error_1 = require("../errors/Unauthorized.error");
class AuthBL {
    async register(input) {
        const existingUser = await user_dal_1.userDAL.findByEmail(input.email);
        if (existingUser)
            throw new UserAlreadyExists_error_1.UserAlreadyExistsError();
        const passwordHash = await bcryptjs_1.default.hash(input.password, Number(process.env.BCRYPT_SALT_ROUNDS));
        const createdUser = await user_dal_1.userDAL.create({
            name: input.name,
            email: input.email,
            passwordHash,
        });
        return {
            user: this.mapUserToAuthResponse(createdUser),
            token: (0, jws_utils_1.signToken)(createdUser.id),
        };
    }
    async login(input) {
        const user = await user_dal_1.userDAL.findByEmail(input.email);
        if (!user)
            throw new InvalidEmailOrPassword_error_1.InvalidEmailOrPasswordError();
        const isPasswordValid = await bcryptjs_1.default.compare(input.password, user.passwordHash);
        if (!isPasswordValid)
            throw new InvalidEmailOrPassword_error_1.InvalidEmailOrPasswordError();
        const token = (0, jws_utils_1.signToken)(user.id);
        return {
            user: this.mapUserToAuthResponse(user),
            token,
        };
    }
    async me(userId) {
        const user = await user_dal_1.userDAL.findById(userId);
        if (!user)
            throw new Unauthorized_error_1.UnauthorizedError();
        return {
            user: this.mapUserToAuthResponse(user),
        };
    }
    mapUserToAuthResponse(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}
exports.authBL = new AuthBL();
