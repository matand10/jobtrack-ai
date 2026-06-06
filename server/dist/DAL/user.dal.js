"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDAL = void 0;
const prisma_1 = require("../config/prisma");
class UserDAL {
    async findByEmail(email) {
        return prisma_1.prisma.user.findUnique({ where: { email } });
    }
    async create(data) {
        return prisma_1.prisma.user.create({ data });
    }
    async findById(id) {
        return prisma_1.prisma.user.findUnique({ where: { id } });
    }
}
exports.userDAL = new UserDAL();
