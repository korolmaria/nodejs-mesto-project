import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import user from '../models/user';
import { IInfoRequest } from '../interface';
import NotFoundError from '../errors/not-found-err';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then((users) => res.send(users))
    .catch(next);
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => user.create({
      ...req.body,
      password: hash,
    }))
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

export const getCurrentUserInfo = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  user.findById(req.user?._id)
    .then((user) => {
      if (user) {
        res.send({ user }.user);
      } else {
        throw new NotFoundError('Такой пользоатель не существует!');
      }
    })
    .catch(next);
};
