"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeMapper = void 0;
class RecipeMapper {
    static toDTO(model) {
        return {
            _id: model._id?.toString?.() ?? model._id,
            image: model.image,
            title: model.title,
            summary: model.summary,
            instructions: model.instructions,
            user: model.user,
            UserId: model.UserId,
        };
    }
    static toDTOList(models) {
        return models.map(RecipeMapper.toDTO);
    }
}
exports.RecipeMapper = RecipeMapper;
//# sourceMappingURL=RecipeMapper.js.map