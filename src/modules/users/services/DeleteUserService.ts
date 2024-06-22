import AppError from '@shared/infra/errors/AppError';
import { IShowUser } from '../domain/models/IShowUser';
import UserRepository from '../infra/knex/repositories/UserRepository';

export default class DeleteUserService {
  public async execute({ id }: IShowUser): Promise<void> {
    const userRepository = new UserRepository();

    const user = await userRepository.findById({ id });

    if (!user) {
      throw new AppError(404, 'Not found', 'User not found');
    }

    await userRepository.delete(user);
  }
}
