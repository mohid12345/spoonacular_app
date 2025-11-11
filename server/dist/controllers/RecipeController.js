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
exports.RecipeController = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../ioc/types");
let RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
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
        this.getRecipeById = async (req, res) => {
            try {
                const UserId = req.body.UserId;
                const { recipeId } = req.params;
                const recipe = await this.recipeService.getRecipeById(recipeId, UserId);
                if (!recipe) {
                    res.status(404).json({ msg: 'Recipe not found' });
                    return;
                }
                res.json(recipe);
            }
            catch (error) {
                console.log(error);
                if (error.message.includes('not Authorized')) {
                    res.status(403).json({ msg: 'you are not Authorized' });
                }
                else {
                    res.status(500).json({ msg: 'Internal server error' });
                }
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
    }
};
exports.RecipeController = RecipeController;
exports.RecipeController = RecipeController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.RecipeService)),
    __metadata("design:paramtypes", [Object])
], RecipeController);
//# sourceMappingURL=RecipeController.js.map