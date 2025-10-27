import mongoose, { Document, Schema } from 'mongoose';
import { IRecipe } from '../types';

export interface IRecipeDocument extends IRecipe {}

const recipeSchema = new Schema<IRecipeDocument>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  instructions: { type: String, required: true },
  user: { type: String, required: true },
  UserId: { type: String, required: true }
}, {
  versionKey: false
});

export const RecipeModel = mongoose.model<IRecipeDocument>('recipe', recipeSchema);
