import supertest from 'supertest';
import { app } from '@shared/infra/http/app';

const userURL = '/api/v1/users/';
const accountURL = '/api/v1/users/:user_id/accounts';

describe('CreateAccount', () => {
  it('Should be able to Update a Existent Account', async () => {
    const email = `${Date.now()}@mail.com`;
    const user = {
      name: 'Jurandir Zero Bala',
      email,
      password: 'jurandir001234',
    };

    const createdUser = await supertest(app).post(userURL).send(user);

    const createdUserID = createdUser.body.id;

    const name = `${Date.now()}-Conta do Jurandir`;

    const accountOriginal = {
      name,
      user_id: createdUserID.toString(),
    };

    const accountURLWithID = accountURL.replace(':user_id', createdUserID);

    const accountCreated = await supertest(app)
      .post(accountURLWithID)
      .send(accountOriginal);

    const newName = `${Date.now()}-Conta atualizada do Jurandir`;

    const account = {
      id: accountCreated.body.id.toString(),
      name: newName,
      user_id: accountCreated.body.user_id.toString(),
    };

    const accountURLWithAccountId =
      accountURLWithID + `/${accountCreated.body.id}`;
    const result = await supertest(app)
      .put(accountURLWithAccountId)
      .send(account);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('name');
    expect(result.body).toHaveProperty('user_id');
  });

  it('Should not be able to update a account that user not exists', async () => {
    const accountName = `${Date.now()}-Conta do Jurandir`;

    const account = {
      name: accountName,
      user_id: '2989823',
    };

    const accountURLWithUserId = accountURL.replace(
      ':user_id',
      account.user_id,
    );

    const result = await supertest(app)
      .put(accountURLWithUserId + '/2')
      .send(account);

    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });
  it('Should not be able to update a account with the same name for other account to the same user', async () => {
    const email = `${Date.now()}@mail.com`;
    const user = {
      name: 'Jurandir Zero Bala',
      email,
      password: 'jurandir001234',
    };

    const createdUser = await supertest(app).post(userURL).send(user);

    const createdUserID = createdUser.body.id;

    const name = `${Date.now()}-Conta do Jurandir`;

    const account = {
      name,
      user_id: createdUserID.toString(),
    };

    const accountURLWithID = accountURL.replace(':user_id', createdUserID);

    const createdAccount = await supertest(app)
      .post(accountURLWithID)
      .send(account);

    const accountURLWithAccountId =
      accountURLWithID + `/${createdAccount.body.id.toString()}`;

    await supertest(app).put(accountURLWithAccountId).send(account);

    const result = await supertest(app)
      .put(accountURLWithAccountId)
      .send(account);
    expect(result.status).toEqual(400);
    expect(result.body.status).toEqual('Bad Request');
    expect(result.body.message).toEqual(
      'Theres already a account with this name for this user',
    );
  });
});
