"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../ioc/types");
const router = (0, express_1.Router)();
exports.RecipeRoutes = router;
const recipeController = inversify_config_1.container.get(types_1.TYPES.RecipeController);
router.use(auth_1.auth);
router.post('/create', recipeController.createRecipe);
router.get('/get', recipeController.getUserRecipes);
router.get('/get/:recipeId', recipeController.getRecipeById);
router.delete('/delete/:recipeId', recipeController.deleteRecipe);
//# sourceMappingURL=recipeRoutes.js.map