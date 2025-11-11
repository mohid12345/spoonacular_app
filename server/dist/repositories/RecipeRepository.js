"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRepository = void 0;
const Recipe_1 = require("../models/Recipe");
const inversify_1 = require("inversify");
let RecipeRepository = class RecipeRepository {
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
};
exports.RecipeRepository = RecipeRepository;
exports.RecipeRepository = RecipeRepository = __decorate([
    (0, inversify_1.injectable)()
], RecipeRepository);
//# sourceMappingURL=RecipeRepository.js.map