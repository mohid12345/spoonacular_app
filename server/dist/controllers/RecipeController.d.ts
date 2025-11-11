import { Response } from 'express';
import { IRecipeService } from '../types';
import { AuthenticatedRequest } from '../middleware/auth';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: IRecipeService);
    createRecipe: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getUserRecipes: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getRecipeById: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    deleteRecipe: (req: AuthenticatedRequest, res: Response) => Promise<void>;
}
//# sourceMappingURL=RecipeController.d.ts.map