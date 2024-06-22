import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

const url: string = '/api/v1/users/';

describe('UpdateUser', () => {
  it('Should be able to update a existent user', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'John Sena',
      email,
      password: 'johnsenafighterz',
    };

    const result = await supertest(app)
      .put(url + '1')
      .send(user);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('id');
    expect(result.body).toHaveProperty('email');
    expect(result.body).toHaveProperty('password');
  });

  it('Should not be able to update a non existent user', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'John Sena',
      email,
      password: 'johnsenafighterz',
    };

    const result = await supertest(app)
      .put(url + '99999')
      .send(user);

    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });

  it('Should not be able to update a user with a existent email', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'John Sena',
      email,
      password: 'johnsenafighterz',
    };

    await supertest(app)
      .put(url + '1')
      .send(user);

    const result = await supertest(app)
      .put(url + '2')
      .send(user);

    expect(result.status).toEqual(400);
    expect(result.body.status).toEqual('Bad Request');
    expect(result.body.message).toEqual(
      'There is already a user with this same email',
    );
  });
});
