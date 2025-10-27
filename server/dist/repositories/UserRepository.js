"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
class UserRepository {
    async findByEmail(email) {
        try {
            const user = await User_1.UserModel.findOne({ email });
            return user;
        }
        catch (error) {
            throw new Error(`Error finding user by email: ${error}`);
        }
    }
    async create(user) {
        try {
            const newUser = new User_1.UserModel(user);
            const savedUser = await newUser.save();
            return savedUser;
        }
        catch (error) {
            throw new Error(`Error creating user: ${error}`);
        }
    }
    async findById(id) {
        try {
            const user = await User_1.UserModel.findById(id);
            return user;
        }
        catch (error) {
            throw new Error(`Error finding user by id: ${error}`);
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map