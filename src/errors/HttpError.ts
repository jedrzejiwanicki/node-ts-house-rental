import { HttpError } from 'routing-controllers';

export interface IHttpError {
  status: number
  code: string
  message?: string
}

export abstract class BaseHttpError extends HttpError {
  code: string;

  constructor(status: number, message: string, code: string) {
    super(status, message);
    this.code = code;
  }

  toJson() : IHttpError {
    return {
      code: this.code,
      status: this.httpCode,
      message: this.message,
    }
  }
}