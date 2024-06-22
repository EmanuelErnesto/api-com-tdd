import supertest from 'supertest';
import { app } from './app';

describe('ServerCall', () => {
  it('Should be able to return response status 200 for request', () => {
    return supertest(app)
      .get('/api/v1/')
      .then(response => expect(response.status).toEqual(200));
  });
});
