import { NextFunction, Request, Response } from 'express';
import { IInfoRequest } from '../interface';
import card from '../models/card';
import NotFoundError from '../errors/not-found-err';
import { CARD_NOT_FOUND_MESSAGE, NOT_PERMISSIONS_MESSAGE } from '../constants/errors';
import STATUSES from '../constants/codes';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

export const createCard = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user?._id })
    .then((card) => res.status(STATUSES.CREATED).send({ card }.card))
    .catch(next);
};

export const findCardById = async (req: Request, res: Response, next: NextFunction) => {
  card.findById(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send({ card }.card);
      } else {
        throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
      }
    })
    .catch(next);
};

export const deleteCardById = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  card.findOneAndDelete({ owner: req.user?._id, _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        res.status(STATUSES.NOTFOUND).send({ message: NOT_PERMISSIONS_MESSAGE });
        return;
      }

      res.send({ card }.card);
    })
    .catch(next);
};

export const likeCard = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => res.send({ card }.card))
    .catch(next);
};

export const dislikeCard = async (req: IInfoRequest, res: Response, next: NextFunction) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user?._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ card }.card);
    })
    .catch(next);
};
