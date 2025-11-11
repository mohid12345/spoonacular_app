"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../ioc/types");
const router = (0, express_1.Router)();
exports.UserRouter = router;
const userController = inversify_config_1.container.get(types_1.TYPES.UserController);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/refresh', userController.refreshToken);
//# sourceMappingURL=userRoutes.js.map