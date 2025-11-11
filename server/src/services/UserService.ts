import { IUserService, IUserRepository, IAuthService } from '../types';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from './AuthService';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private authService: IAuthService;

  // Dependences are injected to follow DIP; defaults provided for convenience
  constructor(
    userRepository: IUserRepository = new UserRepository(),
    authService: IAuthService = new AuthService()
  ) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  async register(name: string, email: string, password: string): Promise<{ msg: string; userRegister?: any }> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        return { msg: "You are already register" };
      }

      // Hash password
      const hashedPassword = await this.authService.hashPassword(password);

      // Create user
      const userData = {
        name,
        email,
        pass: hashedPassword
      };

      await this.userRepository.create(userData);

      return { 
        msg: "User has been created", 
        userRegister: { name, email } 
      };
    } catch (error) {
      throw new Error(`Registration error: ${error}`);
    }
  }

  async login(email: string, password: string): Promise<{ msg: string; token?: string; refreshToken?: string; UserId?: string; user?: string }> {
    try {
      const user = await this.userRepository.findByEmail(email);
      
      if (!user) {
        return { msg: "register first" };
      }

      const isPasswordValid = await this.authService.comparePassword(password, user.pass);
      
      if (isPasswordValid) {
        const token = this.authService.generateToken(user._id!, user.name);
        const refreshToken = this.authService.generateRefreshToken(user._id!, user.name);
        return {
          msg: "user Logged In Success!!!",
          token,
          refreshToken,
          UserId: user._id!,
          user: user.name
        };
      } else {
        return { msg: "Wrong credential" };
      }
    } catch (error) {
      throw new Error(`Login error: ${error}`);
    }
  }

  async refreshToken(refreshToken: string): Promise<{ msg: string; token?: string; refreshToken?: string; UserId?: string; user?: string }> {
    try {
      const decoded = this.authService.verifyRefreshToken(refreshToken);
      
      if (!decoded) {
        return { msg: "Invalid refresh token" };
      }

      const user = await this.userRepository.findById(decoded.UserId);
      
      if (!user) {
        return { msg: "User not found" };
      }

      const newToken = this.authService.generateToken(user._id!, user.name);
      const newRefreshToken = this.authService.generateRefreshToken(user._id!, user.name);
      
      return {
        msg: "Token refreshed successfully",
        token: newToken,
        refreshToken: newRefreshToken,
        UserId: user._id!,
        user: user.name
      };
    } catch (error) {
      throw new Error(`Refresh token error: ${error}`);
    }
  }
}
