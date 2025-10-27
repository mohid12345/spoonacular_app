import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
export declare class RecipeController {
    private recipeService;
    constructor();
    createRecipe: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    getUserRecipes: (req: AuthenticatedRequest, res: Response) => Promise<void>;
    deleteRecipe: (req: AuthenticatedRequest, res: Response) => Promise<void>;
}
//# sourceMappingURL=RecipeController.d.ts.map