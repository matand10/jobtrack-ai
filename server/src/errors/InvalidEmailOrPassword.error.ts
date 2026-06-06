import { BaseError } from "./base.error";

export class InvalidEmailOrPasswordError extends BaseError {
  constructor() {
    super("AUTH_INVALID_CREDENTIALS", "Invalid email or password", 401);
  }
}
