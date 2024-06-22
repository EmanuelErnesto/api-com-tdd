import { app } from '@shared/infra/http/app';
import supertest from 'supertest';

describe('ListUser', () => {
  it('Should be able to return a list of users', () => {
    return supertest(app)
      .get('/api/v1/users')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(0);
      });
  });
});
