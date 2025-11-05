"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const AuthService_1 = require("./AuthService");
class UserService {
    constructor(userRepository = new UserRepository_1.UserRepository(), authService = new AuthService_1.AuthService()) {
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
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map