import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import NotFoundUser from '../errors/not-user';
import { IInfoRequest, TUserInfo } from '../interface';

export default (req: IInfoRequest, res: Response, next: NextFunction) => {
  const cookies = req.headers.cookie;

  if (!cookies && !cookies?.startsWith('token=')) {
    throw new NotFoundUser('Неообходима авторизация');
  }

  const token = cookies.replace('token=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as TUserInfo;

    req.user = { _id: payload._id };
  } catch (err) {
    throw new NotFoundUser('Необходимо авторизоваться');
  }

  next();
};
