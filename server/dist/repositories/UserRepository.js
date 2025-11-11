"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_1 = require("../models/User");
const inversify_1 = require("inversify");
let UserRepository = class UserRepository {
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
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, inversify_1.injectable)()
], UserRepository);
//# sourceMappingURL=UserRepository.js.map