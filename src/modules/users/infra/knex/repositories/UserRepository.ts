import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IShowUser } from '@modules/users/domain/models/IShowUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import knexConfig from '@shared/infra/knex/databaseShared';

class UserRepository implements IUserRepository {
  private knexQueryRunner;

  constructor() {
    this.knexQueryRunner = knexConfig;
  }

  public async findAll(): Promise<IUser[]> {
    return await this.knexQueryRunner('users').select();
  }

  public async findById({ id }: IShowUser): Promise<IUser | undefined> {
    const user = await this.knexQueryRunner('users').where('id', id).first();

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.knexQueryRunner('users')
      .where('email', email)
      .first();

    return user;
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const [user] = await this.knexQueryRunner('users').insert(
      {
        name,
        email,
        password,
      },
      '*',
    );

    return user;
  }

  public async update(user: IUser): Promise<IUser> {
    await this.knexQueryRunner('users').where('id', user.id).update(user);

    return user;
  }

  public async delete(user: IUser): Promise<void> {
    await this.knexQueryRunner('users').where({ id: user.id }).del();
  }
}

export default UserRepository;
