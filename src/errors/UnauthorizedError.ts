import { BaseHttpError } from './HttpError';

export class UnauthorizedError extends BaseHttpError {
  constructor(code: string, message: string) {
    super(403, message, code);
  }
}