// API service index file - exports all API functionality
export * from './endpoints';
export * from './apiMethods';
export * from './recipeService';

// Re-export commonly used services
export { spoonacularApi, localApi } from './apiMethods';
export { RecipeService } from './recipeService';
export type { Recipe, SearchParams, RandomRecipeParams, ApiResponse } from './apiMethods';
