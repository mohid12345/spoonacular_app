import { Request, Response, NextFunction } from 'express';
export interface AuthenticatedRequest extends Request {
    body: {
        UserId?: string;
        user?: string;
        [key: string]: any;
    };
}
export declare const auth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.d.ts.map