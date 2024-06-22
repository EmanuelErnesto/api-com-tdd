import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import { Request, Response } from 'express';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUserService();

    const users = await listUsersService.execute();

    return response.status(200).json(users);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = new ShowUserService();

    const user = await showUserService.execute({ id: Number(id) });

    return response.status(200).json(user);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id: Number(id),
      name,
      email,
      password,
    });

    return response.status(200).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute({ id: Number(id) });

    return response.status(204).json();
  }
}
