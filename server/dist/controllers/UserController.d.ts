import { Request, Response } from 'express';
import { IUserService } from '../types';
export declare class UserController {
    private readonly userService;
    constructor(userService: IUserService);
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map