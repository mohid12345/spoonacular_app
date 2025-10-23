import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

export interface AuthenticatedRequest extends Request {
  body: {
    UserId?: string;
    user?: string;
    [key: string]: any;
  };
}

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authService = new AuthService();
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ msg: 'please login first' });
    return;
  }

  try {
    const decoded = authService.verifyToken(token);
    
    if (decoded) {
      req.body.UserId = decoded.UserId;
      req.body.user = decoded.user;
      next();
    } else {
      res.status(401).json({ msg: 'Token expired, please refresh' });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Not authorized' });
  }
};
