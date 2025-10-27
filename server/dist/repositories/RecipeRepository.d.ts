import { IRecipe, IRecipeRepository } from '../types';
export declare class RecipeRepository implements IRecipeRepository {
    create(recipe: Omit<IRecipe, '_id'>): Promise<IRecipe>;
    findByUserId(userId: string): Promise<IRecipe[]>;
    findById(id: string): Promise<IRecipe | null>;
    deleteById(id: string): Promise<boolean>;
}
//# sourceMappingURL=RecipeRepository.d.ts.map