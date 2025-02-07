import { model, Model, Schema } from 'mongoose';

export interface IUser {
    name: string;
    about: string;
    avatar: string;
}

interface UserModel extends Model<IUser> {}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
}, { versionKey: false });

export default model<IUser, UserModel>('user', userSchema);
