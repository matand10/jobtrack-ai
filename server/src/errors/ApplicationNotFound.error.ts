import { BaseError } from "./base.error";

export class ApplicationNotFoundError extends BaseError {
  constructor() {
    super("APPLICATION_NOT_FOUND", "Application not found", 404);
  }
}
