import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();
//moke commit
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh',  userController.refreshToken);

export { router as UserRouter };
