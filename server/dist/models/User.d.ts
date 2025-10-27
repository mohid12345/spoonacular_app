import mongoose from 'mongoose';
import { IUser } from '../types';
export interface IUserDocument extends IUser {
}
export declare const UserModel: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument> & IUserDocument & Required<{
    _id: string;
}>, any>;
//# sourceMappingURL=User.d.ts.map