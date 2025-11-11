import { Router } from 'express';
import { RecipeController } from '../controllers/RecipeController';
import { auth } from '../middleware/auth';
import { container } from '../inversify.config';
import { TYPES } from '../ioc/types';
import { IRecipeController } from '../types';

const router = Router();
const recipeController = container.get<IRecipeController>(TYPES.RecipeController);

// Apply auth middleware to all recipe routes
router.use(auth);

router.post('/create', recipeController.createRecipe);
router.get('/get', recipeController.getUserRecipes);
router.get('/get/:recipeId', recipeController.getRecipeById);
router.delete('/delete/:recipeId', recipeController.deleteRecipe);

export { router as RecipeRoutes };
