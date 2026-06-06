"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationBL = void 0;
const application_dal_1 = require("../DAL/application.dal");
const ApplicationNotFound_error_1 = require("../errors/ApplicationNotFound.error");
const Unauthorized_error_1 = require("../errors/Unauthorized.error");
class ApplicationBL {
    async create(userId, input) {
        const requiredUserId = this.requireUserId(userId);
        const application = await application_dal_1.applicationDAL.create(requiredUserId, input);
        return { application };
    }
    async list(userId, query) {
        const requiredUserId = this.requireUserId(userId);
        const [applications, total] = await Promise.all([
            application_dal_1.applicationDAL.findManyByUser(requiredUserId, query),
            application_dal_1.applicationDAL.countByUser(requiredUserId, query),
        ]);
        return {
            applications,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit),
            },
        };
    }
    async getById(userId, id) {
        const requiredUserId = this.requireUserId(userId);
        const application = await application_dal_1.applicationDAL.findByIdAndUserId(id, requiredUserId);
        if (!application)
            throw new ApplicationNotFound_error_1.ApplicationNotFoundError();
        return { application };
    }
    async update(userId, id, input) {
        const requiredUserId = this.requireUserId(userId);
        const application = await application_dal_1.applicationDAL.updateByIdAndUserId(id, requiredUserId, input);
        if (!application)
            throw new ApplicationNotFound_error_1.ApplicationNotFoundError();
        return { application };
    }
    async delete(userId, id) {
        const requiredUserId = this.requireUserId(userId);
        const deleted = await application_dal_1.applicationDAL.deleteByIdAndUserId(id, requiredUserId);
        if (!deleted)
            throw new ApplicationNotFound_error_1.ApplicationNotFoundError();
        return { success: true };
    }
    requireUserId(userId) {
        if (!userId)
            throw new Unauthorized_error_1.UnauthorizedError();
        return userId;
    }
}
exports.applicationBL = new ApplicationBL();
