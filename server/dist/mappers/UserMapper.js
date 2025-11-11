"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
class UserMapper {
    static toDTO(model) {
        return {
            _id: model._id?.toString?.() ?? model._id,
            name: model.name,
            email: model.email,
            pass: model.pass,
        };
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=UserMapper.js.map