import { IRecipeService, IRecipeRepository } from '../types';
export declare class RecipeService implements IRecipeService {
    private recipeRepository;
    constructor(recipeRepository?: IRecipeRepository);
    createRecipe(recipeData: Omit<import('../types').IRecipe, '_id'>): Promise<{
        msg: string;
    }>;
    getUserRecipes(userId: string): Promise<import('../types').IRecipe[]>;
    getRecipeById(recipeId: string, userId: string): Promise<import('../types').IRecipe | null>;
    deleteRecipe(recipeId: string, userId: string): Promise<{
        msg: string;
    }>;
}
//# sourceMappingURL=RecipeService.d.ts.map