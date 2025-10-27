import mongoose from 'mongoose';
import { IRecipe } from '../types';
export interface IRecipeDocument extends IRecipe {
}
export declare const RecipeModel: mongoose.Model<IRecipeDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRecipeDocument> & IRecipeDocument & Required<{
    _id: string;
}>, any>;
//# sourceMappingURL=Recipe.d.ts.map