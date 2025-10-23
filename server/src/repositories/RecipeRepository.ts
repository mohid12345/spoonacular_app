import { IRecipe, IRecipeRepository } from '../types';
import { RecipeModel } from '../models/Recipe';

export class RecipeRepository implements IRecipeRepository {
  async create(recipe: Omit<IRecipe, '_id'>): Promise<IRecipe> {
    try {
      const newRecipe = new RecipeModel(recipe);
      const savedRecipe = await newRecipe.save();
      return savedRecipe;
    } catch (error) {
      throw new Error(`Error creating recipe: ${error}`);
    }
  }

  async findByUserId(userId: string): Promise<IRecipe[]> {
    try {
      const recipes = await RecipeModel.find({ UserId: userId });
      return recipes;
    } catch (error) {
      throw new Error(`Error finding recipes by user id: ${error}`);
    }
  }

  async findById(id: string): Promise<IRecipe | null> {
    try {
      const recipe = await RecipeModel.findById(id);
      return recipe;
    } catch (error) {
      throw new Error(`Error finding recipe by id: ${error}`);
    }
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      const result = await RecipeModel.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw new Error(`Error deleting recipe: ${error}`);
    }
  }
}
