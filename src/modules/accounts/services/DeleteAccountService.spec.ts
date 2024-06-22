import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

const url: string = '/api/v1/users/:user_id/accounts';

describe('DeleteAccount', () => {
  it('Should be able to delete a existent account', async () => {
    const name = `${Date.now()}-Conta a ser deletada`;

    const account = {
      name: name,
      user_id: '1',
    };

    const urlWithId = url.replace(':user_id', account.user_id);
    const createdAccount = await supertest(app).post(urlWithId).send(account);
    const createdAccountId = createdAccount.body.id;

    const urlComplete = urlWithId + '/' + createdAccountId;

    const result = await supertest(app).delete(urlComplete);

    expect(result.status).toEqual(204);
  });
  it('Should not be able to delete a account that not exists', async () => {
    const name = `${Date.now()}-Conta a ser deletada`;

    const account = {
      name: name,
      user_id: '1',
    };

    const urlWithId = url.replace(':user_id', account.user_id);

    const urlComplete = urlWithId + '/' + '99999';

    const result = await supertest(app).delete(urlComplete);

    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('Account not found');
  });
  it('Should not be able to delete a account that user not exists', async () => {
    const name = `${Date.now()}-Conta a ser deletada`;

    const account = {
      name: name,
      user_id: '99999',
    };

    const urlWithId = url.replace(':user_id', account.user_id);

    const urlComplete = urlWithId + '/' + '4';

    const result = await supertest(app).delete(urlComplete);

    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });
});
