import { IUserService } from '../types';
export declare class UserService implements IUserService {
    private userRepository;
    private authService;
    constructor();
    register(name: string, email: string, password: string): Promise<{
        msg: string;
        userRegister?: any;
    }>;
    login(email: string, password: string): Promise<{
        msg: string;
        token?: string;
        refreshToken?: string;
        UserId?: string;
        user?: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        msg: string;
        token?: string;
        refreshToken?: string;
        UserId?: string;
        user?: string;
    }>;
}
//# sourceMappingURL=UserService.d.ts.map