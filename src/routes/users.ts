import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, createUser, findUserById, updateProfile, updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:userId', findUserById);
router.post('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required(),
  }),
}), createUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
  }).unknown(),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }).unknown(),
}), updateAvatar);

export default router;
