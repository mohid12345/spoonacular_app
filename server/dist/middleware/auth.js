"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const inversify_config_1 = require("../inversify.config");
const types_1 = require("../ioc/types");
const auth = (req, res, next) => {
    const authService = inversify_config_1.container.get(types_1.TYPES.AuthService);
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ msg: 'please login first' });
        return;
    }
    try {
        const decoded = authService.verifyToken(token);
        if (decoded) {
            req.body.UserId = decoded.UserId;
            req.body.user = decoded.user;
            next();
        }
        else {
            res.status(401).json({ msg: 'Token expired, please refresh' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Not authorized' });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map