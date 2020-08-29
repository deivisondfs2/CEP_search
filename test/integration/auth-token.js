import request from 'supertest';
import app from '../../src/app';
import AuthServer from '../lib/auth-server';

describe('Token', () => {
  it('should not be requested because token not present', async () => {
    const response = await request(app).post('/api/v1/cep').send({
      firstName: 'deivison',
      lastName: 'sales',
      emailAddress: 'deivisondfs@gmail.com'
    });

    const { status, error, message } = response.body;
    expect(status).toBe(401);
    expect(error).toMatch(/invalid_token/i);
    expect(message).toMatch(/Invalid token/i);
  });

  it('should not be requested because token be expired', async () => {
    const payload = {
      iss: 'https://dev-deivison.us.auth0.com/',
      sub: 'auth0|be0177c2-0f70-5200-f67e-e0bc252c0ac6',
      aud: ['http://localhost:8080/api/'],
      iat: 1591795563,
      exp: 1591800686,
      azp: 'lHcBWR6j107twSbV8Z02S94B24c7A5mF',
      scope: 'openid profile email'
    };
    const accessToken = AuthServer.buildToken({ payload });
    const response = await request(app)
      .post('/api/v1/cep')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cep: 22333999
      });
    const { status, error, message } = response.body;

    expect(status).toBe(401);
    expect(error).toMatch(/invalid_token/i);
    expect(message).toMatch(/Invalid token/i);
  });

  it('should return 401 invalid_token when accessing with an invalid bearer token', async () => {
    const response = await request(app)
      .post('/api/v1/cep')
      .set('Authorization', 'Bearer DUMMY')
      .send({
        firstName: 'deivison',
        lastName: 'sales',
        emailAddress: 'deivisondfs@gmail.com'
      });
    const { status, error, message } = response.body;

    expect(status).toBe(401);
    expect(error).toMatch(/invalid_token/i);
    expect(message).toMatch(/Invalid token/i);
  });

  it('should return 401 invalid_token when iss not valid', async () => {
    const payload = {
      iss: 'https://iss-invalid/',
      sub: 'auth0|be0177c2-0f70-5200-f67e-e0bc252c0ac6',
      aud: ['http://localhost:8080/api/'],
      iat: 1591795563,
      exp: 1591800686,
      azp: 'lHcBWR6j107twSbV8Z02S94B24c7A5mF',
      scope: 'openid profile email urn:axa.partners.insurance.claims.write offline_access'
    };
    const accessToken = AuthServer.buildToken({ payload });
    const response = await request(app)
      .post('/api/v1/cep')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        firstName: 'deivison',
        lastName: 'sales',
        emailAddress: 'deivisondfs@gmail.com'
      });
    const { status, error, message } = response.body;

    expect(status).toBe(401);
    expect(error).toMatch(/invalid_token/i);
    expect(message).toMatch(/Invalid token/i);
  });
});
