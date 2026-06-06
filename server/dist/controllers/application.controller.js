"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationController = void 0;
const application_bl_1 = require("../BL/application.bl");
const application_schema_1 = require("../schemas/application.schema");
const response_utils_1 = require("../utils/response.utils");
class ApplicationController {
    async list(req, res) {
        const query = application_schema_1.listApplicationsQuerySchema.parse(req.query);
        const result = await application_bl_1.applicationBL.list(req.userId, query);
        return (0, response_utils_1.sendSuccess)(res, result);
    }
    async create(req, res) {
        const input = application_schema_1.createApplicationSchema.parse(req.body);
        const result = await application_bl_1.applicationBL.create(req.userId, input);
        return (0, response_utils_1.sendSuccess)(res, result, 201);
    }
    async getById(req, res) {
        const { id } = application_schema_1.applicationParamsSchema.parse(req.params);
        const result = await application_bl_1.applicationBL.getById(req.userId, id);
        return (0, response_utils_1.sendSuccess)(res, result);
    }
    async update(req, res) {
        const { id } = application_schema_1.applicationParamsSchema.parse(req.params);
        const input = application_schema_1.updateApplicationSchema.parse(req.body);
        const result = await application_bl_1.applicationBL.update(req.userId, id, input);
        return (0, response_utils_1.sendSuccess)(res, result);
    }
    async delete(req, res) {
        const { id } = application_schema_1.applicationParamsSchema.parse(req.params);
        const result = await application_bl_1.applicationBL.delete(req.userId, id);
        return (0, response_utils_1.sendSuccess)(res, result);
    }
}
exports.applicationController = new ApplicationController();
