import { applicationDAL } from "../DAL/application.dal";
import { ApplicationNotFoundError } from "../errors/ApplicationNotFound.error";
import { UnauthorizedError } from "../errors/Unauthorized.error";
import type {
  CreateApplicationInput,
  ListApplicationsQuery,
  UpdateApplicationInput,
} from "../schemas/application.schema";

class ApplicationBL {
  public async create(userId: string | undefined, input: CreateApplicationInput) {
    const requiredUserId = this.requireUserId(userId);
    const application = await applicationDAL.create(requiredUserId, input);

    return { application };
  }

  public async list(userId: string | undefined, query: ListApplicationsQuery) {
    const requiredUserId = this.requireUserId(userId);
    const [applications, total] = await Promise.all([
      applicationDAL.findManyByUser(requiredUserId, query),
      applicationDAL.countByUser(requiredUserId, query),
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

  public async getById(userId: string | undefined, id: string) {
    const requiredUserId = this.requireUserId(userId);
    const application = await applicationDAL.findByIdAndUserId(id, requiredUserId);

    if (!application) throw new ApplicationNotFoundError();

    return { application };
  }

  public async update(
    userId: string | undefined,
    id: string,
    input: UpdateApplicationInput,
  ) {
    const requiredUserId = this.requireUserId(userId);
    const application = await applicationDAL.updateByIdAndUserId(
      id,
      requiredUserId,
      input,
    );

    if (!application) throw new ApplicationNotFoundError();

    return { application };
  }

  public async delete(userId: string | undefined, id: string) {
    const requiredUserId = this.requireUserId(userId);
    const deleted = await applicationDAL.deleteByIdAndUserId(id, requiredUserId);

    if (!deleted) throw new ApplicationNotFoundError();

    return { success: true };
  }

  private requireUserId(userId: string | undefined) {
    if (!userId) throw new UnauthorizedError();
    return userId;
  }
}

export const applicationBL = new ApplicationBL();
