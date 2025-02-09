import { IAppError } from '../interface';
import STATUSES from '../constants/codes';

export default class NotFoundErr extends Error implements IAppError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = STATUSES.NOTFOUND;
  }
}
