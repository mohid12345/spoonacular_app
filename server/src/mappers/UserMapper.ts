import { IUser } from '@/types';

export class UserMapper {
	static toDTO(model: any): IUser {
		return {
			_id: model._id?.toString?.() ?? model._id,
			name: model.name,
			email: model.email,
			pass: model.pass,
		};
	}
}


