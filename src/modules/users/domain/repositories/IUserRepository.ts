import { ICreateUser } from '../models/ICreateUser';
import { IShowUser } from '../models/IShowUser';
import { IUpdateUser } from '../models/IUpdateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById({ id }: IShowUser): Promise<IUser | undefined>;
  create({ name, email, password }: ICreateUser): Promise<IUser>;
  update({ id, name, password, email }: IUpdateUser): Promise<IUser>;
  delete(user: IUser): Promise<void>;
}
