import supertest from 'supertest';
import { app } from '@shared/infra/http/app';

describe('CreateUser', () => {
  it('Should be able to create a new User', () => {
    const email = `${Date.now()}@mail.com`;
    return supertest(app)
      .post('/api/v1/users')
      .send({
        name: 'Walter White',
        email,
        password: '123456',
      })
      .then(response => {
        expect(response.status).toEqual(201);
        expect(response.body.name).toEqual('Walter White');
      });
  });

  it('Should not be able to create a new user with a existent email', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'Walter White',
      email,
      password: '123456S',
    };

    await supertest(app).post('/api/v1/users').send(user);

    const result = await supertest(app).post('/api/v1/users').send(user);

    expect(result.status).toEqual(400);
    expect(result.body.message).toEqual(
      'There is already a user with this same email',
    );
  });

  it('Should not be able to create a user without email', async () => {
    const user = {
      name: 'John Doe',
      password: '1234567',
    };

    const result = await supertest(app).post('/api/v1/users').send(user);

    expect(result.body.code).toEqual(400);
    expect(result.body.status).toEqual('Bad Request');
    expect(result.body.details.length).toBeGreaterThan(0);
  });
  it('Should not be able to create a user without name', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      email,
      password: '123456S',
    };

    const result = await supertest(app).post('/api/v1/users').send(user);

    expect(result.body.code).toEqual(400);
    expect(result.body.status).toEqual('Bad Request');
    expect(result.body.details.length).toBeGreaterThan(0);
  });
  it('Should not be able to create a user without password', async () => {
    const email = `${Date.now()}@mail.com`;

    const user = {
      name: 'John Doe',
      email,
    };

    const result = await supertest(app).post('/api/v1/users').send(user);

    expect(result.body.code).toEqual(400);
    expect(result.body.status).toEqual('Bad Request');
    expect(result.body.details.length).toBeGreaterThan(0);
  });
});
