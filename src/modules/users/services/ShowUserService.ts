import AppError from '@shared/infra/errors/AppError';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import UserRepository from '../infra/knex/repositories/UserRepository';

export default class ShowUserService {
  public async execute({ id }: IShowUser): Promise<IUser> {
    const userRepository = new UserRepository();

    const user = await userRepository.findById({ id });

    if (!user) {
      throw new AppError(404, 'Not found', 'User not found');
    }

    return user;
  }
}
