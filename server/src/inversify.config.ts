import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './ioc/types';
import { IUserRepository, IRecipeRepository, IAuthService, IUserService, IRecipeService } from './types';
import { UserRepository } from './repositories/UserRepository';
import { RecipeRepository } from './repositories/RecipeRepository';
import { AuthService } from './services/AuthService';
import { UserService } from './services/UserService';
import { RecipeService } from './services/RecipeService';

const container = new Container();

// Repositories
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<IRecipeRepository>(TYPES.RecipeRepository).to(RecipeRepository).inSingletonScope();

// Services
container.bind<IAuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IRecipeService>(TYPES.RecipeService).toDynamicValue((ctx) => {
	const recipeRepo = ctx.container.get<IRecipeRepository>(TYPES.RecipeRepository);
	return new RecipeService(recipeRepo);
});

export { container };


