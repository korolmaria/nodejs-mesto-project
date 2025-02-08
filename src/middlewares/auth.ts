import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IInfoRequest, TUserInfo } from '../interface';

export default (req: IInfoRequest, res: Response, next: NextFunction) => {
  const { cookie } = req.headers;

  if (!cookie && !cookie?.startsWith('token=')) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });

    return;
  }

  const token = cookie.replace('token=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as TUserInfo;
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });

    return;
  }

  req.user = { _id: payload._id };
  next();
};
