import { Response } from 'express';
import { RecipeService } from '../services/RecipeService';
import { AuthenticatedRequest } from '../middleware/auth';

export class RecipeController {
  private recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  createRecipe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const result = await this.recipeService.createRecipe(data as any);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ msg: (error as Error).message });
    }
  };

  getUserRecipes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const UserId = req.body.UserId;
      const recipes = await this.recipeService.getUserRecipes(UserId as string);
      res.send(recipes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };

  getRecipeById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const UserId = req.body.UserId;
      const { recipeId } = req.params;
      
      const recipe = await this.recipeService.getRecipeById(recipeId, UserId as string);
      
      if (!recipe) {
        res.status(404).json({ msg: 'Recipe not found' });
        return;
      }
      
      res.json(recipe);
    } catch (error) {
      console.log(error);
      if ((error as Error).message.includes('not Authorized')) {
        res.status(403).json({ msg: 'you are not Authorized' });
      } else {
        res.status(500).json({ msg: 'Internal server error' });
      }
    }
  };

  deleteRecipe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userIdInUserDoc = req.body.UserId;
      const { recipeId } = req.params;
      
      console.log(recipeId);
      const result = await this.recipeService.deleteRecipe(recipeId, userIdInUserDoc as any);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Internal server error' });
    }
  };
}

