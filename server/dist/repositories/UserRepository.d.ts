import { IUser, IUserRepository } from '../types';
export declare class UserRepository implements IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    create(user: Omit<IUser, '_id'>): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map