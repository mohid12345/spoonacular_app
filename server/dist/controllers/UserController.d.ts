import { Request, Response } from 'express';
export declare class UserController {
    private userService;
    constructor();
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    refreshToken: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map