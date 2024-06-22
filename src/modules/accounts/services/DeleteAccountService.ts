import UserRepository from '@modules/users/infra/knex/repositories/UserRepository';
import { IShowAccount } from '../domain/models/IShowAccount';
import AccountsRepository from '../infra/knex/repositories/AccountsRepository';
import AppError from '@shared/infra/errors/AppError';

class DeleteAccountService {
  public async execute({ id, user_id }: IShowAccount): Promise<void> {
    const accountsRepository = new AccountsRepository();
    const usersRepository = new UserRepository();

    const userExists = await usersRepository.findById({
      id: user_id,
    });

    if (!userExists) {
      throw new AppError(404, 'Not found', 'User not found');
    }

    const account = await accountsRepository.findById({
      id,
      user_id,
    });

    if (!account) {
      throw new AppError(404, 'Not found', 'Account not found');
    }

    await accountsRepository.delete(account);
  }
}

export default DeleteAccountService;
