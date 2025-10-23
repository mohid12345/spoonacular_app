// Service layer for recipe operations
import { spoonacularApi, localApi, type Recipe, type SearchParams } from '../api';

export class RecipeService {
  /**
   * Search recipes with filters
   */
  static async searchRecipes(filters: SearchParams): Promise<Recipe[]> {
    try {
      return await spoonacularApi.searchRecipes(filters);
    } catch (error) {
      console.error('RecipeService: Error searching recipes:', error);
      throw new Error('Failed to search recipes');
    }
  }

  /**
   * Get random recipes
   */
  static async getRandomRecipes(number: number = 12, ): Promise<Recipe[]> {
    try {
      return await spoonacularApi.getRandomRecipes({ number });
    } catch (error) {
      console.error('RecipeService: Error fetching random recipes:', error);
      throw new Error('Failed to fetch random recipes');
    }
  }

  /**
   * Get recipe details
   */
  static async getRecipeDetails(id: number): Promise<Recipe> {
    try {
      return await spoonacularApi.getRecipeInfo(id);
    } catch (error) {
      console.error('RecipeService: Error fetching recipe details:', error);
      throw new Error('Failed to fetch recipe details');
    }
  }

  /**
   * Add recipe to favorites
   */
  static async addToFavorites(recipe: Recipe): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const data = {
        image: recipe.image,
        title: recipe.title,
        summary: recipe.summary,
        instructions: recipe.instructions,
      };

      await localApi.createRecipe(data);
    } catch (error) {
      console.error('RecipeService: Error adding to favorites:', error);
      throw error;
    }
  }

  /**
   * Get user's favorite recipes
   */
  static async getFavoriteRecipes(): Promise<Recipe[]> {
    try {
      const response = await localApi.getRecipes();
      return response.data || [];
    } catch (error) {
      console.error('RecipeService: Error fetching favorite recipes:', error);
      throw new Error('Failed to fetch favorite recipes');
    }
  }

  /**
   * Remove recipe from favorites
   */
  static async removeFromFavorites(id: number): Promise<void> {
    try {
      await localApi.deleteRecipe(id);
    } catch (error) {
      console.error('RecipeService: Error removing from favorites:', error);
      throw new Error('Failed to remove recipe from favorites');
    }
  }
}
