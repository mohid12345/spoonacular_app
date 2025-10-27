import { IAuthService } from '../types';
export declare class AuthService implements IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    generateToken(userId: string, name: string): string;
    generateRefreshToken(userId: string, name: string): string;
    verifyToken(token: string): {
        UserId: string;
        user: string;
    } | null;
    verifyRefreshToken(token: string): {
        UserId: string;
        user: string;
    } | null;
}
//# sourceMappingURL=AuthService.d.ts.map