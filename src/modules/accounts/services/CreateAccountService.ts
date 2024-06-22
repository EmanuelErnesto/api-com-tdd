import UserRepository from '@modules/users/infra/knex/repositories/UserRepository';
import { IAccount } from '../domain/models/IAccount';
import AccountsRepository from '../infra/knex/repositories/AccountsRepository';
import AppError from '@shared/infra/errors/AppError';
import { ICreateAccount } from '../domain/models/ICreateAccount';

class CreateAccountService {
  public async execute({ name, user_id }: ICreateAccount): Promise<IAccount> {
    const accountsRepository = new AccountsRepository();
    const usersRepository = new UserRepository();

    const user = await usersRepository.findById({ id: user_id });

    if (!user) {
      throw new AppError(404, 'Not found', 'User not found');
    }

    const userAccountExists = await accountsRepository.findByNameAndUserId({
      name,
      user_id,
    });

    if (userAccountExists) {
      throw new AppError(
        400,
        'Bad Request',
        'Theres already a account with this name for this user',
      );
    }

    const account = await accountsRepository.create({
      name,
      user_id,
    });

    return account;
  }
}

export default CreateAccountService;
