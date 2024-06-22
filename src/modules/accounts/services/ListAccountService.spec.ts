import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

const accountURL = '/api/v1/users/:user_id/accounts';

describe('ListAccount', () => {
  it('Should be able to return a list of accounts', async () => {
    const id = '1';

    const urlWithId = accountURL.replace(':user_id', id);

    const result = await supertest(app).get(urlWithId).send();
    expect(result.status).toEqual(200);
    expect(result.body.length).toBeGreaterThan(0);
  });
  it('Should not be able to return a list of accounts if the user does not exist', async () => {
    const inexistentUserId = '999999';
    const urlWithId = accountURL.replace(':user_id', inexistentUserId);

    const result = await supertest(app).get(urlWithId).send();
    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });
});
