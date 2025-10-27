"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
class UserController {
    constructor() {
        this.register = async (req, res) => {
            try {
                const { name, email, pass } = req.body;
                const result = await this.userService.register(name, email, pass);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ msg: 'password not hash' });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                console.log("details login :", email, password);
                const result = await this.userService.login(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Internal server error' });
            }
        };
        this.refreshToken = async (req, res) => {
            try {
                const { refreshToken } = req.body;
                const result = await this.userService.refreshToken(refreshToken);
                res.status(200).json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: 'Internal server error' });
            }
        };
        this.userService = new UserService_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map