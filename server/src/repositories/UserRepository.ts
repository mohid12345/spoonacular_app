import { IUser, IUserRepository } from '../types';
import { UserModel } from '../models/User';

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error}`);
    }
  }

  async create(user: Omit<IUser, '_id'>): Promise<IUser> {
    try {
      const newUser = new UserModel(user);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async findById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(id);
      return user;
    } catch (error) {
      throw new Error(`Error finding user by id: ${error}`);
    }
  }
}
