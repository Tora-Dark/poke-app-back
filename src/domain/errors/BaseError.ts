export class BaseError extends Error {
    public statusCode: number;
    public isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message); // Call the parent constructor (Error)
      this.statusCode = statusCode;
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  