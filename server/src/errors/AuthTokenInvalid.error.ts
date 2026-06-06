import { BaseError } from "./base.error";

export class AuthTokenInvalidError extends BaseError {
  constructor() {
    super("AUTH_TOKEN_INVALID", "Invalid authentication token", 401);
  }
}
