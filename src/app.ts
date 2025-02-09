import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Joi, celebrate } from 'celebrate';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { IAppError } from './interface';
import limiter from './limiter';
import login from './controllers/login';
import { createUser } from './controllers/users';
import auth from './middlewares/auth';
import { errorLogger, requestLogger } from './middlewares/logger';
import 'dotenv/config';
import configs from './config';
import { INVALID_QUERY_PARAMETERS_MESSAGE, INVALID_USER_DATA_MESSAGE, SERVER_FAILED_MESSAGE } from './constants/errors';
import STATUSES from './constants/codes';

const app = express();

mongoose.connect(`${configs.DB_HOST}:${configs.DB_PORT}/${configs.DB}`).then(() => {});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

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

app.use(errorLogger);
app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message, name } = err;

  if (err.name === 'MongoServerError') {
    res.status(STATUSES.NOTCORRECTDATA).send({ message: INVALID_USER_DATA_MESSAGE });
  }

  if (['CastError'].includes(name)) {
    res.status(STATUSES.QUERIES).send({ message: INVALID_QUERY_PARAMETERS_MESSAGE });
  }

  if (['ValidationError', 'Error'].includes(name)) {
    res.status(STATUSES.QUERIES).send({ message });
  }

  res.status(statusCode || STATUSES.SERVER)
    .send({ message: statusCode === 500 ? SERVER_FAILED_MESSAGE : message });
});

app.use('*', (req: Request, res: Response) => {
  res.status(STATUSES.NOTFOUND).send({ message: INVALID_QUERY_PARAMETERS_MESSAGE });
});

app.listen(configs.PORT);
