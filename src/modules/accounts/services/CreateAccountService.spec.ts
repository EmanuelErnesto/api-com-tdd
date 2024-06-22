import supertest from 'supertest';
import { app } from '@shared/infra/http/app';

const userURL = '/api/v1/users/';
const accountURL = '/api/v1/users/:user_id/accounts';

describe('CreateAccount', () => {
  it('Should be able to create a new Account', async () => {
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

    const result = await supertest(app).post(accountURLWithID).send(account);

    expect(result.status).toEqual(201);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('name');
    expect(result.body).toHaveProperty('user_id');
  });

  it('Should not be able to create a account without a existent user', async () => {
    const accountName = `${Date.now()}-Conta do Jurandir`;

    const account = {
      name: accountName,
      user_id: '2989823',
    };

    const result = await supertest(app)
      .post(accountURL.replace(':user_id', '2989823'))
      .send(account);
    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });

  it('Should not be able to create two accounts with the same name for the same user', async () => {
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

    await supertest(app).post(accountURLWithID).send(account);
    const result = await supertest(app).post(accountURLWithID).send(account);

    expect(result.status).toEqual(400);
    expect(result.body.status).toEqual('Bad Request');
    expect(result.body.message).toEqual(
      'Theres already a account with this name for this user',
    );
  });
});
