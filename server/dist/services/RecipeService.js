"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../ioc/types");
let RecipeService = class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
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
    async getRecipeById(recipeId, userId) {
        try {
            const recipe = await this.recipeRepository.findById(recipeId);
            if (!recipe) {
                return null;
            }
            if (recipe.UserId !== userId) {
                throw new Error("you are not Authorized");
            }
            return recipe;
        }
        catch (error) {
            throw new Error(`Error getting recipe: ${error}`);
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
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.RecipeRepository)),
    __metadata("design:paramtypes", [Object])
], RecipeService);
//# sourceMappingURL=RecipeService.js.map