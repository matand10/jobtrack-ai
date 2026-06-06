import { BaseError } from "./base.error";

export class AuthTokenMissingError extends BaseError {
  constructor() {
    super("AUTH_TOKEN_MISSING", "Authentication token is required", 401);
  }
}
