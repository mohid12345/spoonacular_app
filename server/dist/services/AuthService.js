"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
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
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map