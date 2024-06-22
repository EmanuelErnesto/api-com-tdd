import { IAccount } from '@modules/accounts/domain/models/IAccount';
import { ICreateAccount } from '@modules/accounts/domain/models/ICreateAccount';
import { IFindAccountByNameAndUserId } from '@modules/accounts/domain/models/IFindAccountByNameAndUserId';
import { IListAccount } from '@modules/accounts/domain/models/IListAccount';
import { IShowAccount } from '@modules/accounts/domain/models/IShowAccount';
import { IAccountsRepository } from '@modules/accounts/domain/repositories/IAccountsRepository';
import knexConfig from '@shared/infra/knex/databaseShared';

class AccountsRepository implements IAccountsRepository {
  private knexQueryRunner;
  constructor() {
    this.knexQueryRunner = knexConfig;
  }
  public async findAll({ user_id }: IListAccount): Promise<IAccount[]> {
    return await this.knexQueryRunner('accounts')
      .select()
      .where('user_id', user_id);
  }
  public async findById({
    id,
    user_id,
  }: IShowAccount): Promise<IAccount | undefined> {
    const account = await this.knexQueryRunner('accounts')
      .where({
        id: id,
        user_id: user_id,
      })
      .first();

    return account;
  }

  public async findByNameAndUserId({
    name,
    user_id,
  }: IFindAccountByNameAndUserId): Promise<IAccount | undefined> {
    const account = await this.knexQueryRunner('accounts')
      .select('name', 'user_id')
      .where({
        name,
        user_id,
      })
      .first();

    return account;
  }

  public async create({ name, user_id }: ICreateAccount): Promise<IAccount> {
    const [account] = await this.knexQueryRunner('accounts').insert(
      {
        name,
        user_id,
      },
      '*',
    );

    return account;
  }

  public async update(account: IAccount): Promise<IAccount> {
    await this.knexQueryRunner('accounts')
      .where('id', account.id)
      .update(account);

    return account;
  }

  public async delete(account: IAccount): Promise<void> {
    await this.knexQueryRunner('accounts')
      .where({ id: account.id, user_id: account.user_id })
      .del();
  }
}

export default AccountsRepository;
