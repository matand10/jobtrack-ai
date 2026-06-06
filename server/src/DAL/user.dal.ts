import { prisma } from "../config/prisma";

type CreateUserData = {
  name: string;
  email: string;
  passwordHash: string;
};

class UserDAL {
  public async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  public async create(data: CreateUserData) {
    return prisma.user.create({ data });
  }

  public async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}

export const userDAL = new UserDAL();
