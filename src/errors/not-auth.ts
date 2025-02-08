import { IAppError } from '../interface';

export default class NotFoundAuth extends Error implements IAppError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
