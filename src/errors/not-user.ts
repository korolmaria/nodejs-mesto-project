import { IAppError } from '../interface';

export default class NotFoundUser extends Error implements IAppError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
