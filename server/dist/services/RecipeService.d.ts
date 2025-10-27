import { IRecipeService } from '../types';
export declare class RecipeService implements IRecipeService {
    private recipeRepository;
    constructor();
    createRecipe(recipeData: Omit<import('../types').IRecipe, '_id'>): Promise<{
        msg: string;
    }>;
    getUserRecipes(userId: string): Promise<import('../types').IRecipe[]>;
    deleteRecipe(recipeId: string, userId: string): Promise<{
        msg: string;
    }>;
}
//# sourceMappingURL=RecipeService.d.ts.map