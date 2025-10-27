"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const RecipeService_1 = require("../services/RecipeService");
class RecipeController {
    constructor() {
        this.createRecipe = async (req, res) => {
            try {
                const data = req.body;
                const result = await this.recipeService.createRecipe(data);
                res.status(200).json(result);
            }
            catch (error) {
                res.status(400).json({ msg: error.message });
            }
        };
        this.getUserRecipes = async (req, res) => {
            try {
                const UserId = req.body.UserId;
                const recipes = await this.recipeService.getUserRecipes(UserId);
                res.send(recipes);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Internal server error' });
            }
        };
        this.deleteRecipe = async (req, res) => {
            try {
                const userIdInUserDoc = req.body.UserId;
                const { recipeId } = req.params;
                console.log(recipeId);
                const result = await this.recipeService.deleteRecipe(recipeId, userIdInUserDoc);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Internal server error' });
            }
        };
        this.recipeService = new RecipeService_1.RecipeService();
    }
}
exports.RecipeController = RecipeController;
//# sourceMappingURL=RecipeController.js.map