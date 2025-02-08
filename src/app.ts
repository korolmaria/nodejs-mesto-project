import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errors, Joi, celebrate } from 'celebrate';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { IAppError } from './interface';
import limiter from './limiter';
import login from './controllers/login';
import { createUser } from './controllers/users';
import auth from './middlewares/auth.';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
  }),
}), createUser);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Переданы некорректные данные!' });
});

app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message, name } = err;

  if (['CastError', 'ValidationError', 'Error'].includes(name)) {
    res.status(400).send({ message: 'Переданы некорректные данные!' });
  }

  res.status(statusCode || 500).send({ message: statusCode === 500 ? 'На сервере произошла ошибка!' : message });
});

app.listen(PORT);
