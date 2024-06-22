import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

describe('ShowUser', () => {
  it('Should be able to return a existent user', async () => {
    const result = await supertest(app).get('/api/v1/users/1');

    expect(result.body).toHaveProperty('name');
    expect(result.body).toHaveProperty('id');
  });

  it('Should not be able to return a non existent user', async () => {
    const result = await supertest(app).get('/api/v1/users/999999');

    expect(result.body.code).toEqual(404);
    expect(result.body.status).toEqual('Not found');
    expect(result.body.message).toEqual('User not found');
  });
});
