"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const inversify_1 = require("inversify");
let AuthService = class AuthService {
    async hashPassword(password) {
        try {
            const saltRounds = 5;
            return await bcrypt_1.default.hash(password, saltRounds);
        }
        catch (error) {
            throw new Error(`Error hashing password: ${error}`);
        }
    }
    async comparePassword(password, hash) {
        try {
            return await bcrypt_1.default.compare(password, hash);
        }
        catch (error) {
            throw new Error(`Error comparing password: ${error}`);
        }
    }
    generateToken(userId, name) {
        try {
            const secret = process.env.JWT_SECRET || 'masai';
            return jsonwebtoken_1.default.sign({ UserId: userId, user: name }, secret, { expiresIn: '15m' });
        }
        catch (error) {
            throw new Error(`Error generating token: ${error}`);
        }
    }
    generateRefreshToken(userId, name) {
        try {
            const secret = process.env.JWT_REFRESH_SECRET || 'masai_refresh';
            return jsonwebtoken_1.default.sign({ UserId: userId, user: name }, secret, { expiresIn: '7d' });
        }
        catch (error) {
            throw new Error(`Error generating refresh token: ${error}`);
        }
    }
    verifyToken(token) {
        try {
            const secret = process.env.JWT_SECRET || 'masai';
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
    verifyRefreshToken(token) {
        try {
            const secret = process.env.JWT_REFRESH_SECRET || 'masai_refresh';
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)()
], AuthService);
//# sourceMappingURL=AuthService.js.map