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
exports.UserService = void 0;
const inversify_1 = require("inversify");
const types_1 = require("../ioc/types");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    async register(name, email, password) {
        try {
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                return { msg: "You are already register" };
            }
            const hashedPassword = await this.authService.hashPassword(password);
            const userData = {
                name,
                email,
                pass: hashedPassword
            };
            await this.userRepository.create(userData);
            return {
                msg: "User has been created",
                userRegister: { name, email }
            };
        }
        catch (error) {
            throw new Error(`Registration error: ${error}`);
        }
    }
    async login(email, password) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return { msg: "register first" };
            }
            const isPasswordValid = await this.authService.comparePassword(password, user.pass);
            if (isPasswordValid) {
                const token = this.authService.generateToken(user._id, user.name);
                const refreshToken = this.authService.generateRefreshToken(user._id, user.name);
                return {
                    msg: "user Logged In Success!!!",
                    token,
                    refreshToken,
                    UserId: user._id,
                    user: user.name
                };
            }
            else {
                return { msg: "Wrong credential" };
            }
        }
        catch (error) {
            throw new Error(`Login error: ${error}`);
        }
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = this.authService.verifyRefreshToken(refreshToken);
            if (!decoded) {
                return { msg: "Invalid refresh token" };
            }
            const user = await this.userRepository.findById(decoded.UserId);
            if (!user) {
                return { msg: "User not found" };
            }
            const newToken = this.authService.generateToken(user._id, user.name);
            const newRefreshToken = this.authService.generateRefreshToken(user._id, user.name);
            return {
                msg: "Token refreshed successfully",
                token: newToken,
                refreshToken: newRefreshToken,
                UserId: user._id,
                user: user.name
            };
        }
        catch (error) {
            throw new Error(`Refresh token error: ${error}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.UserRepository)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.AuthService)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
//# sourceMappingURL=UserService.js.map