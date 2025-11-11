import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthService } from '../types';
import { injectable } from 'inversify';

@injectable()
export class AuthService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 5;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw new Error(`Error hashing password: ${error}`);
    }
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new Error(`Error comparing password: ${error}`);
    }
  }

  generateToken(userId: string, name: string): string {
    try {
      const secret = process.env.JWT_SECRET || 'masai';
      return jwt.sign({ UserId: userId, user: name }, secret, { expiresIn: '15m' });
    } catch (error) {
      throw new Error(`Error generating token: ${error}`);
    }
  }

  generateRefreshToken(userId: string, name: string): string {
    try {
      const secret = process.env.JWT_REFRESH_SECRET || 'masai_refresh';
      return jwt.sign({ UserId: userId, user: name }, secret, { expiresIn: '7d' });
    } catch (error) {
      throw new Error(`Error generating refresh token: ${error}`);
    }
  }

  verifyToken(token: string): { UserId: string; user: string } | null {
    try {
      const secret = process.env.JWT_SECRET || 'masai';
      const decoded = jwt.verify(token, secret) as { UserId: string; user: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  verifyRefreshToken(token: string): { UserId: string; user: string } | null {
    try {
      const secret = process.env.JWT_REFRESH_SECRET || 'masai_refresh';
      const decoded = jwt.verify(token, secret) as { UserId: string; user: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
