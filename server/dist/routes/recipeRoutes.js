"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = require("express");
const RecipeController_1 = require("../controllers/RecipeController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
exports.RecipeRoutes = router;
const recipeController = new RecipeController_1.RecipeController();
router.use(auth_1.auth);
router.post('/create', recipeController.createRecipe);
router.get('/get', recipeController.getUserRecipes);
router.delete('/delete/:recipeId', recipeController.deleteRecipe);
//# sourceMappingURL=recipeRoutes.js.map