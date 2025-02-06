import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";
import {IAppError, IInfoRequest} from "./interface";

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb').then(()=> {});

app.use((req: IInfoRequest, res: Response, next: NextFunction) => {
    req.user = {
        _id: '67a47e7c0d5682a0f923ae16'
    };

    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(cardRouter);

app.use((err: IAppError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode, message, name } = err;

    if (name === 'CastError') {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
    }

    res.status(statusCode || 500).send({ message: statusCode === 500 ? 'На сервере произошла ошибка!' : message });
});

app.listen(PORT);