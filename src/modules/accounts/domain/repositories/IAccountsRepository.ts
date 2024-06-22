import { IAccount } from '../models/IAccount';
import { IFindAccountByNameAndUserId } from '../models/IFindAccountByNameAndUserId';
import { IListAccount } from '../models/IListAccount';
import { IShowAccount } from '../models/IShowAccount';

export interface IAccountsRepository {
  findAll({ user_id }: IListAccount): Promise<IAccount[]>;
  findById({ id, user_id }: IShowAccount): Promise<IAccount | undefined>;
  findByNameAndUserId({
    name,
    user_id,
  }: IFindAccountByNameAndUserId): Promise<IAccount | undefined>;
  create({ id, name, user_id }: IAccount): Promise<IAccount>;
  update({ id, name, user_id }: IAccount): Promise<IAccount>;
  delete(user: IAccount): Promise<void>;
}
