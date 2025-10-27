import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../types';

export interface IUserDocument extends IUser {}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true }
}, {
  versionKey: false
});

export const UserModel = mongoose.model<IUserDocument>('user', userSchema);
