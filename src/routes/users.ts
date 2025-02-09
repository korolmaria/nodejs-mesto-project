import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, findUserById, updateProfile, updateAvatar, getCurrentUserInfo,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    password: Joi.string(),
    email: Joi.string().email(),
    avatar: Joi.string(),
  }).unknown(),
}), updateProfile);

router.get('/users/me/', getCurrentUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }).unknown(),
}), updateAvatar);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), findUserById);

export default router;
