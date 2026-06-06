import { BaseError } from "./base.error";

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super("AUTH_EMAIL_ALREADY_EXISTS", "User already exists", 409);
  }
}
