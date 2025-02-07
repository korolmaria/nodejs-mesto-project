import { NextFunction, Request, Response } from 'express';
import user from '../models/user';
import { IInfoRequest } from '../interface';
import NotFoundError from '../errors/not-found-err';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }.user))
    .catch(next);
};

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  user.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ user }.user);
      } else {
        throw new NotFoundError('Такой пользоатель не существует!');
      }
    })
    .catch(next);
};

export const updateProfile = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  user.findByIdAndUpdate(req.user?._id, { ...req.body }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ user }.user))
    .catch(next);
};

export const updateAvatar = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  user.findByIdAndUpdate(req.user?._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ user }.user))
    .catch(next);
};
