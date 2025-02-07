import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  createCard, deleteCardById, dislikeCard, findCardById, getCards, likeCard,
} from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.get('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), findCardById);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).max(200),
    owner: Joi.string().required(),
    likes: Joi.array().items({ type: 'string' }),
    createdAt: Joi.date().default(Date.now()),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), deleteCardById);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), dislikeCard);

export default router;
