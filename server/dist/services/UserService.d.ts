import { IUserService, IUserRepository, IAuthService } from '../types';
export declare class UserService implements IUserService {
    private userRepository;
    private authService;
    constructor(userRepository?: IUserRepository, authService?: IAuthService);
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