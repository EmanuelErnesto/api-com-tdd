import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

const url: string = '/api/v1/users/';

describe('DeleteUser', () => {
  it('Should be able to delete a existent user', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'Walter White',
      email,
      password: '123456S',
    };

    const createdUser = await supertest(app).post('/api/v1/users').send(user);
    const createdUserId = createdUser.body.id;

    const result = await supertest(app).delete(url + createdUserId);

    expect(result.status).toEqual(204);
  });
  it('Should not be able to delete a non existent user', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'Walter White',
      email,
      password: '123456S',
    };

    const createdUser = await supertest(app).post('/api/v1/users').send(user);
    const createdUserId = createdUser.body.id;

    await supertest(app).delete(url + createdUserId);
    const result = await supertest(app).delete(url + createdUserId);

    expect(result.status).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });
});
