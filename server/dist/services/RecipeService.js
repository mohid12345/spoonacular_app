"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const RecipeRepository_1 = require("../repositories/RecipeRepository");
class RecipeService {
    constructor() {
        this.recipeRepository = new RecipeRepository_1.RecipeRepository();
    }
    async createRecipe(recipeData) {
        try {
            await this.recipeRepository.create(recipeData);
            return { msg: "added in fav recipe successfully!!!" };
        }
        catch (error) {
            throw new Error(`Error creating recipe: ${error}`);
        }
    }
    async getUserRecipes(userId) {
        try {
            return await this.recipeRepository.findByUserId(userId);
        }
        catch (error) {
            throw new Error(`Error getting user recipes: ${error}`);
        }
    }
    async deleteRecipe(recipeId, userId) {
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
            }
            else {
                return { msg: "Failed to delete recipe" };
            }
        }
        catch (error) {
            throw new Error(`Error deleting recipe: ${error}`);
        }
    }
}
exports.RecipeService = RecipeService;
//# sourceMappingURL=RecipeService.js.map