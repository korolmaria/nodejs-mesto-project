import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IInfoRequest, TUserInfo } from '../interface';
import { AUTH_FAILED_MESSAGE } from '../constants/errors';
import STATUSES from '../constants/codes';

export default (req: IInfoRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  if (!cookie && !cookie?.startsWith('token=')) {
    res
      .status(STATUSES.AUTH)
      .send({ message: AUTH_FAILED_MESSAGE });

    return;
  }

  const token = cookie.replace('token=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as TUserInfo;
  } catch (err) {
    res
      .status(STATUSES.AUTH)
      .send({ message: AUTH_FAILED_MESSAGE });

    return;
  }

  req.user = { _id: payload._id };
  next();
};
