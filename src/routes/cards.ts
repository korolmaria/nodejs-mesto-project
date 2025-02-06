import { Router } from 'express';
import {
  createCard, deleteCardById, dislikeCard, findCardById, getCards, likeCard,
} from '../controllers/cards';

const router = Router();

router.get('/cards', getCards);
router.get('/cards/:cardId', findCardById);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

export default router;
