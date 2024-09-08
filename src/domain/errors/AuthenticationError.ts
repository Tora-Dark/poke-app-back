import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
  constructor(
    message: string = "Authentication failed",
    statusCode: number = 401
  ) {
    super(message, statusCode);
  }
}
