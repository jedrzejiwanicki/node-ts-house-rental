import { BaseHttpError } from './HttpError';

export class UnprocessableEntity extends BaseHttpError {
  constructor(code: string, message: string) {
    super(422, message, code);
  }
}