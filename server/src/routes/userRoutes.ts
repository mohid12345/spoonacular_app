import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { container } from '../inversify.config';
import { TYPES } from '../ioc/types';
import { IUserService } from '../types';

const router = Router();
const userService = container.get<IUserService>(TYPES.UserService);
const userController = new UserController(userService);  

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh',  userController.refreshToken);

export { router as UserRouter };
