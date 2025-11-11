export interface IUser {
    _id?: string;
    name: string;
    email: string;
    pass: string;
}
export interface IRecipe {
    _id?: string;
    image: string;
    title: string;
    summary: string;
    instructions: string;
    user: string;
    UserId: string;
}
export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>;
    create(user: Omit<IUser, '_id'>): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
}
export interface IRecipeRepository {
    create(recipe: Omit<IRecipe, '_id'>): Promise<IRecipe>;
    findByUserId(userId: string): Promise<IRecipe[]>;
    findById(id: string): Promise<IRecipe | null>;
    deleteById(id: string): Promise<boolean>;
}
export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    generateToken(userId: string, name: string): string;
    generateRefreshToken(userId: string, name: string): string;
    verifyToken(token: string): {
        UserId: string;
        user: string;
    } | null;
    verifyRefreshToken(token: string): {
        UserId: string;
        user: string;
    } | null;
}
export interface IUserService {
    register(name: string, email: string, password: string): Promise<{
        msg: string;
        userRegister?: any;
    }>;
    login(email: string, password: string): Promise<{
        msg: string;
        token?: string;
        refreshToken?: string;
        UserId?: string;
        user?: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        msg: string;
        token?: string;
        refreshToken?: string;
        UserId?: string;
        user?: string;
    }>;
}
export interface IRecipeService {
    createRecipe(recipeData: Omit<IRecipe, '_id'>): Promise<{
        msg: string;
    }>;
    getUserRecipes(userId: string): Promise<IRecipe[]>;
    getRecipeById(recipeId: string, userId: string): Promise<IRecipe | null>;
    deleteRecipe(recipeId: string, userId: string): Promise<{
        msg: string;
    }>;
}
import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from '@/middleware/auth';
export interface IUserController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    refreshToken(req: Request, res: Response): Promise<void>;
}
export interface IRecipeController {
    createRecipe(req: AuthenticatedRequest, res: Response): Promise<void>;
    getUserRecipes(req: AuthenticatedRequest, res: Response): Promise<void>;
    getRecipeById(req: AuthenticatedRequest, res: Response): Promise<void>;
    deleteRecipe(req: AuthenticatedRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map