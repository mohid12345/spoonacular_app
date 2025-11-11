import { Router } from 'express';
import { RecipeController } from '../controllers/RecipeController';
import { auth } from '../middleware/auth';
import { container } from '../inversify.config';
import { TYPES } from '../ioc/types';
import { IRecipeService } from '../types';

const router = Router();
const recipeService = container.get<IRecipeService>(TYPES.RecipeService);
const recipeController = new RecipeController(recipeService);

// Apply auth middleware to all recipe routes
router.use(auth);

router.post('/create', recipeController.createRecipe);
router.get('/get', recipeController.getUserRecipes);
router.get('/get/:recipeId', recipeController.getRecipeById);
router.delete('/delete/:recipeId', recipeController.deleteRecipe);

export { router as RecipeRoutes };
