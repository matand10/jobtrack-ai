"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationDAL = void 0;
const prisma_1 = require("../config/prisma");
class ApplicationDAL {
    async create(userId, data) {
        return prisma_1.prisma.application.create({
            data: {
                ...data,
                userId,
            },
        });
    }
    async findManyByUser(userId, query) {
        return prisma_1.prisma.application.findMany({
            where: this.buildWhere(userId, query),
            orderBy: this.buildOrderBy(query.sort),
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
    }
    async countByUser(userId, filters) {
        return prisma_1.prisma.application.count({
            where: this.buildWhere(userId, filters),
        });
    }
    async findByIdAndUserId(id, userId) {
        return prisma_1.prisma.application.findFirst({
            where: { id, userId },
        });
    }
    async updateByIdAndUserId(id, userId, data) {
        return prisma_1.prisma.$transaction(async (tx) => {
            const result = await tx.application.updateMany({
                where: { id, userId },
                data,
            });
            if (result.count === 0)
                return null;
            return tx.application.findFirst({
                where: { id, userId },
            });
        });
    }
    async deleteByIdAndUserId(id, userId) {
        const result = await prisma_1.prisma.application.deleteMany({
            where: { id, userId },
        });
        return result.count > 0;
    }
    buildWhere(userId, filters) {
        const where = { userId };
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
    buildOrderBy(sort) {
        if (sort === "oldest")
            return { createdAt: "asc" };
        if (sort === "company")
            return { company: "asc" };
        return { createdAt: "desc" };
    }
}
exports.applicationDAL = new ApplicationDAL();
