import { Request, Response } from 'express';
import { IUserService } from '../types';

export class UserController {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, pass } = req.body;
      const result = await this.userService.register(name, email, pass);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: 'password not hash' });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      console.log("details login :", email,password);
      
      const result = await this.userService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const result = await this.userService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
}
