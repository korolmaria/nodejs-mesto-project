import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/user';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  user.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET, SECRET_DEV } = process.env;
      const secret = NODE_ENV === 'production' ? JWT_SECRET : SECRET_DEV;
      const token = jwt.sign({ _id: user._id }, `${secret}`, { expiresIn: '15m' });

      res.cookie('token', token);
      res.send({ message: 'Токен сохранен' });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неправильные почта или пароль' });
    });
};

export default login;
