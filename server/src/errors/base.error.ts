export class BaseError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode = 500,
    public details?: unknown,
  ) {
    super(message);
  }
}
