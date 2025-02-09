import { model, Model, Schema } from 'mongoose';
import validator from 'validator';
import { INVALID_LINK_MESSAGE } from '../constants/errors';

export interface ICard {
    name: string;
    link: string;
    owner: Schema.Types.ObjectId;
    likes: Schema.Types.ObjectId[];
    createdAt: Date;
}

interface CardModel extends Model<ICard> {}

const cardSchema = new Schema<ICard, CardModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: INVALID_LINK_MESSAGE,
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

export default model<ICard, CardModel>('card', cardSchema);
