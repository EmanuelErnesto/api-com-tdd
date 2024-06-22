import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import AppError from '@shared/infra/errors/AppError';
import UserRepository from '../infra/knex/repositories/UserRepository';

export default class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const userRepository = new UserRepository();

    const userEmailExists = await userRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError(
        400,
        'Bad Request',
        'There is already a user with this same email',
      );
    }

    const user = await userRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
