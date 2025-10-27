"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRepository = void 0;
const Recipe_1 = require("../models/Recipe");
class RecipeRepository {
    async create(recipe) {
        try {
            const newRecipe = new Recipe_1.RecipeModel(recipe);
            const savedRecipe = await newRecipe.save();
            return savedRecipe;
        }
        catch (error) {
            throw new Error(`Error creating recipe: ${error}`);
        }
    }
    async findByUserId(userId) {
        try {
            const recipes = await Recipe_1.RecipeModel.find({ UserId: userId });
            return recipes;
        }
        catch (error) {
            throw new Error(`Error finding recipes by user id: ${error}`);
        }
    }
    async findById(id) {
        try {
            const recipe = await Recipe_1.RecipeModel.findById(id);
            return recipe;
        }
        catch (error) {
            throw new Error(`Error finding recipe by id: ${error}`);
        }
    }
    async deleteById(id) {
        try {
            const result = await Recipe_1.RecipeModel.findByIdAndDelete(id);
            return result !== null;
        }
        catch (error) {
            throw new Error(`Error deleting recipe: ${error}`);
        }
    }
}
exports.RecipeRepository = RecipeRepository;
//# sourceMappingURL=RecipeRepository.js.map