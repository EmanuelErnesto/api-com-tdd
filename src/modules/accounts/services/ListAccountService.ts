import UserRepository from '@modules/users/infra/knex/repositories/UserRepository';
import { IAccount } from '../domain/models/IAccount';
import { IListAccount } from '../domain/models/IListAccount';
import AccountsRepository from '../infra/knex/repositories/AccountsRepository';
import AppError from '@shared/infra/errors/AppError';

export default class ListAccountService {
  public async execute({ user_id }: IListAccount): Promise<IAccount[]> {
    const accountsRepository = new AccountsRepository();
    const usersRepository = new UserRepository();

    const userExists = await usersRepository.findById({ id: user_id });

    if (!userExists) {
      throw new AppError(404, 'Not found', 'User not found');
    }

    const accounts = await accountsRepository.findAll({
      user_id,
    });

    return accounts;
  }
}
