import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
  constructor(message: string = "Invalid request data") {
    super(message, 400);
  }
}
