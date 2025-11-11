import { IRecipe } from '@/types';

export class RecipeMapper {
	static toDTO(model: any): IRecipe {
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

	static toDTOList(models: any[]): IRecipe[] {
		return models.map(RecipeMapper.toDTO);
	}
}


