import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './ioc/types';
import { IUserRepository, IRecipeRepository, IAuthService, IUserService, IRecipeService, IUserController, IRecipeController } from './types';
import { UserRepository } from './repositories/UserRepository';
import { RecipeRepository } from './repositories/RecipeRepository';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { RecipeService } from './services/RecipeService';
import { UserController } from './controllers/UserController';
import { RecipeController } from './controllers/RecipeController';

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IRecipeRepository>(TYPES.RecipeRepository).to(RecipeRepository).inSingletonScope();

// Services
container.bind<IAuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IRecipeService>(TYPES.RecipeService).to(RecipeService);
// Controllers
container.bind<IUserController>(TYPES.UserController).to(UserController);
container.bind<IRecipeController>(TYPES.RecipeController).to(RecipeController);

export { container };


