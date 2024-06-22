import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

const accountURL = '/api/v1/users/:user_id/accounts/:id';

describe('ShowAccount', () => {
  it('Should be able to return a existent account', async () => {
    const user_id = '1';
    const id = '2';

    const accountURLWithUserId = accountURL.replace(':user_id', user_id);

    const accountURLWithId = accountURLWithUserId.replace(':id', id);

    const result = await supertest(app).get(accountURLWithId);
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('name');
    expect(result.body).toHaveProperty('user_id');
  });

  it('Should not be able to return a account that not exists', async () => {
    const user_id = '1';
    const id = '99999';

    const accountURLWithUserId = accountURL.replace(':user_id', user_id);

    const accountURLWithId = accountURLWithUserId.replace(':id', id);

    const result = await supertest(app).get(accountURLWithId);
    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('Account not found');
  });
  it('Should not be able to return a account that user not exists', async () => {
    const user_id = '99999';
    const id = '2';

    const accountURLWithUserId = accountURL.replace(':user_id', user_id);

    const accountURLWithId = accountURLWithUserId.replace(':id', id);

    const result = await supertest(app).get(accountURLWithId);
    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });
});
