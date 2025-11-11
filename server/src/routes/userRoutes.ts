import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { container } from '../inversify.config';
import { TYPES } from '../ioc/types';
import { IUserController } from '../types';

const router = Router();
const userController = container.get<IUserController>(TYPES.UserController);

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh',  userController.refreshToken);

export { router as UserRouter };
