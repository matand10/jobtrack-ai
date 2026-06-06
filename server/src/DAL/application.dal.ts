import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import type {
  CreateApplicationInput,
  ListApplicationsQuery,
  UpdateApplicationInput,
} from "../schemas/application.schema";

type ApplicationFilters = Pick<ListApplicationsQuery, "search" | "status">;

class ApplicationDAL {
  public async create(userId: string, data: CreateApplicationInput) {
    return prisma.application.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  public async findManyByUser(userId: string, query: ListApplicationsQuery) {
    return prisma.application.findMany({
      where: this.buildWhere(userId, query),
      orderBy: this.buildOrderBy(query.sort),
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
  }

  public async countByUser(userId: string, filters: ApplicationFilters) {
    return prisma.application.count({
      where: this.buildWhere(userId, filters),
    });
  }

  public async findByIdAndUserId(id: string, userId: string) {
    return prisma.application.findFirst({
      where: { id, userId },
    });
  }

  public async updateByIdAndUserId(
    id: string,
    userId: string,
    data: UpdateApplicationInput,
  ) {
    return prisma.$transaction(async (tx) => {
      const result = await tx.application.updateMany({
        where: { id, userId },
        data,
      });

      if (result.count === 0) return null;

      return tx.application.findFirst({
        where: { id, userId },
      });
    });
  }

  public async deleteByIdAndUserId(id: string, userId: string) {
    const result = await prisma.application.deleteMany({
      where: { id, userId },
    });

    return result.count > 0;
  }

  private buildWhere(
    userId: string,
    filters: ApplicationFilters,
  ): Prisma.ApplicationWhereInput {
    const where: Prisma.ApplicationWhereInput = { userId };

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where.OR = [
        { company: { contains: filters.search, mode: "insensitive" } },
        { role: { contains: filters.search, mode: "insensitive" } },
        { location: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    return where;
  }

  private buildOrderBy(
    sort: ListApplicationsQuery["sort"],
  ): Prisma.ApplicationOrderByWithRelationInput {
    if (sort === "oldest") return { createdAt: "asc" };
    if (sort === "company") return { company: "asc" };
    return { createdAt: "desc" };
  }
}

export const applicationDAL = new ApplicationDAL();
