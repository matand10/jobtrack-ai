import { userDAL } from "../DAL/user.dal";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExists.error";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.utils";
import type { User } from "@prisma/client";
import { InvalidEmailOrPasswordError } from "../errors/InvalidEmailOrPassword.error";
import { UnauthorizedError } from "../errors/Unauthorized.error";
import type { AuthUser, LoginInput, RegisterInput } from "@jobtrack/shared";

class AuthBL {
  public async register(input: RegisterInput) {
    const existingUser = await userDAL.findByEmail(input.email);

    if (existingUser) throw new UserAlreadyExistsError();

    const passwordHash = await bcrypt.hash(
      input.password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    const createdUser = await userDAL.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return {
      user: this.mapUserToAuthResponse(createdUser),
      token: signToken(createdUser.id),
    };
  }

  public async login(input: LoginInput) {
    const user = await userDAL.findByEmail(input.email);

    if (!user) throw new InvalidEmailOrPasswordError();

    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.passwordHash,
    );

    if (!isPasswordValid) throw new InvalidEmailOrPasswordError();

    const token = signToken(user.id);
    return {
      user: this.mapUserToAuthResponse(user),
      token,
    };
  }

  public async me(userId: string) {
    const user = await userDAL.findById(userId);
    if (!user) throw new UnauthorizedError();

    return {
      user: this.mapUserToAuthResponse(user),
    };
  }

  private mapUserToAuthResponse(user: User): AuthUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export const authBL = new AuthBL();
