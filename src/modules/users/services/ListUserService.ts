import { IUser } from '../domain/models/IUser';
import UserRepository from '../infra/knex/repositories/UserRepository';

export default class ListUserService {
  public async execute(): Promise<IUser[]> {
    const userRepository = new UserRepository();

    const users = await userRepository.findAll();

    return users;
  }
}
