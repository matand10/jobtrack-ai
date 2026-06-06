import { BaseError } from "./base.error";

export class UnauthorizedError extends BaseError {
  constructor() {
    super("AUTH_UNAUTHORIZED", "Unauthorized", 401);
  }
}
