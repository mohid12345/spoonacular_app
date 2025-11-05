import { IRecipeService, IRecipeRepository } from '../types';
import { RecipeRepository } from '../repositories/RecipeRepository';

export class RecipeService implements IRecipeService {
  private recipeRepository: IRecipeRepository;

  // Inject repository to decouple service from concrete implementation
  constructor(recipeRepository: IRecipeRepository = new RecipeRepository()) {
    this.recipeRepository = recipeRepository;
  }

  async createRecipe(recipeData: Omit<import('../types').IRecipe, '_id'>): Promise<{ msg: string }> {
    try {
      await this.recipeRepository.create(recipeData);
      return { msg: "added in fav recipe successfully!!!" };
    } catch (error) {
      throw new Error(`Error creating recipe: ${error}`);
    }
  }

  async getUserRecipes(userId: string): Promise<import('../types').IRecipe[]> {
    try {
      return await this.recipeRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(`Error getting user recipes: ${error}`);
    }
  }

  async getRecipeById(recipeId: string, userId: string): Promise<import('../types').IRecipe | null> {
    try {
      const recipe = await this.recipeRepository.findById(recipeId);
      
      if (!recipe) {
        return null;
      }

      // Check if the recipe belongs to the user
      if (recipe.UserId !== userId) {
        throw new Error("you are not Authorized");
      }

      return recipe;
    } catch (error) {
      throw new Error(`Error getting recipe: ${error}`);
    }
  }

  async deleteRecipe(recipeId: string, userId: string): Promise<{ msg: string }> {
    try {
      const recipe = await this.recipeRepository.findById(recipeId);
      
      if (!recipe) {
        return { msg: "Recipe not found" };
      }

      if (recipe.UserId !== userId) {
        return { msg: "you are not Authorized" };
      }

      const deleted = await this.recipeRepository.deleteById(recipeId);
      
      if (deleted) {
        return { msg: "Recipe has been deleted success" };
      } else {
        return { msg: "Failed to delete recipe" };
      }
    } catch (error) {
      throw new Error(`Error deleting recipe: ${error}`);
    }
  }
}
