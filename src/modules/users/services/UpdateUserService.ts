import AppError from '@shared/infra/errors/AppError';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { IUser } from '../domain/models/IUser';
import UserRepository from '../infra/knex/repositories/UserRepository';

export default class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
  }: IUpdateUser): Promise<IUser> {
    const userRepository = new UserRepository();

    const user = await userRepository.findById({ id });

    if (!user) {
      throw new AppError(404, 'Not found', 'User not found');
    }

    const userEmailExists = await userRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError(
        400,
        'Bad Request',
        'There is already a user with this same email',
      );
    }

    await userRepository.update({
      id,
      name,
      email,
      password,
    });

    return user;
  }
}
