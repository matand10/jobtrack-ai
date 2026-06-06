import { Request, Response } from "express";
import { loginSchema, registerSchema } from "@jobtrack/shared";
import { authBL } from "../BL/auth.bl";
import { sendSuccess } from "../utils/response.utils";
import { UnauthorizedError } from "../errors/Unauthorized.error";
import { clearAuthCookie, setAuthCookie } from "../utils/cookie";

class AuthController {
  public async register(req: Request, res: Response) {
    const input = registerSchema.parse(req.body);
    const { user, token } = await authBL.register(input);
    setAuthCookie(res, token);
    sendSuccess(res, { user }, 201);
  }

  public async login(req: Request, res: Response) {
    const input = loginSchema.parse(req.body);
    const { user, token } = await authBL.login(input);
    setAuthCookie(res, token);
    sendSuccess(res, { user });
  }

  public async me(req: Request, res: Response) {
    if (!req.userId) throw new UnauthorizedError();

    const result = await authBL.me(req.userId);
    return sendSuccess(res, result);
  }

  public async logout(_req: Request, res: Response) {
    clearAuthCookie(res);
    return sendSuccess(res, { success: true });
  }
}

export const authController = new AuthController();
