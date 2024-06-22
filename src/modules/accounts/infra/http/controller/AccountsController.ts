import CreateAccountService from '@modules/accounts/services/CreateAccountService';
import DeleteAccountService from '@modules/accounts/services/DeleteAccountService';
import ListAccountService from '@modules/accounts/services/ListAccountService';
import ShowAccountService from '@modules/accounts/services/ShowAccountService';
import UpdateAccountService from '@modules/accounts/services/UpdateAccountService';
import { Request, Response } from 'express';

export default class AccountsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listAccountsService = new ListAccountService();

    const accounts = await listAccountsService.execute({
      user_id: Number(user_id),
    });

    return response.status(200).json(accounts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id, id } = request.params;

    const showAccountService = new ShowAccountService();

    const account = await showAccountService.execute({
      id: Number(id),
      user_id: Number(user_id),
    });

    return response.status(200).json(account);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;
    const { name } = request.body;

    const createAccountService = new CreateAccountService();

    const account = await createAccountService.execute({
      name,
      user_id: Number(user_id),
    });

    return response.status(201).json(account);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, id } = request.params;
    const { name } = request.body;

    const updateAccountService = new UpdateAccountService();

    const account = await updateAccountService.execute({
      id: Number(id),
      name,
      user_id: Number(user_id),
    });

    return response.status(200).json(account);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { user_id, id } = request.params;

    const deleteAccountService = new DeleteAccountService();

    await deleteAccountService.execute({
      id: Number(id),
      user_id: Number(user_id),
    });

    return response.status(204).json();
  }
}
