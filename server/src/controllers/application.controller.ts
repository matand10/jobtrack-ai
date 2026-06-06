import type { Request, Response } from "express";
import { applicationBL } from "../BL/application.bl";
import {
  applicationParamsSchema,
  createApplicationSchema,
  listApplicationsQuerySchema,
  updateApplicationSchema,
} from "../schemas/application.schema";
import { sendSuccess } from "../utils/response.utils";

class ApplicationController {
  public async list(req: Request, res: Response) {
    const query = listApplicationsQuerySchema.parse(req.query);
    const result = await applicationBL.list(req.userId, query);

    return sendSuccess(res, result);
  }

  public async create(req: Request, res: Response) {
    const input = createApplicationSchema.parse(req.body);
    const result = await applicationBL.create(req.userId, input);

    return sendSuccess(res, result, 201);
  }

  public async getById(req: Request, res: Response) {
    const { id } = applicationParamsSchema.parse(req.params);
    const result = await applicationBL.getById(req.userId, id);

    return sendSuccess(res, result);
  }

  public async update(req: Request, res: Response) {
    const { id } = applicationParamsSchema.parse(req.params);
    const input = updateApplicationSchema.parse(req.body);
    const result = await applicationBL.update(req.userId, id, input);

    return sendSuccess(res, result);
  }

  public async delete(req: Request, res: Response) {
    const { id } = applicationParamsSchema.parse(req.params);
    const result = await applicationBL.delete(req.userId, id);

    return sendSuccess(res, result);
  }
}

export const applicationController = new ApplicationController();
