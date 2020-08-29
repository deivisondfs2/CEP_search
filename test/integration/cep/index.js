/* eslint-disable jest/no-disabled-tests */
/* eslint-disable no-console */
/* eslint-disable jest/expect-expect */
import request from 'supertest';

import app from '../../../src/app';

import CepService from '../../../src/service/cep';
import cepsMocks from '../../../src/helper/cep-mock-list';

import {
  cep1Result,
  cepWithoutDataResult,
  listCepWithStreetEmpty,
  listCepWithStreetEmptyPosition3
} from './mock-result';
import AuthServer from '../../lib/auth-server';

jest.mock('../../../src/service/cep');
jest.mock('../../../src/helper/cep-mock-list');

describe('Cep', () => {
  const parameterCepInvalid = {
    parameterCepInvalid: 51170110
  };

  const cepValueInvalid = {
    cep: 'aa'
  };

  const cep1 = {
    cep: 51170110
  };

  const cep2 = {
    cep: 22222222
  };

  const cep3 = {
    cep: 22333999
  };

  const payload = {
    iss: 'https://dev-deivison.us.auth0.com/',
    sub: 'auth0|be0177c2-0f70-5200-f67e-e0bc252c0ac6',
    aud: ['http://localhost:8080/api/'],
    iat: 1591795563,
    azp: 'lHcBWR6j107twSbV8Z02S94B24c7A5mF',
    scope: 'openid profile email'
  };

  it('not be able to query invalid parameter zip code', async () => {
    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(parameterCepInvalid);

    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('schemaErrors');
    expect(body.error).toMatch(/payload validation/i);
    expect(body.message).toMatch(/cep is invalid/i);
    expect(body.status).toEqual(400);
  });

  it('not be able to query invalid value zip code', async () => {
    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cepValueInvalid);

    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('schemaErrors');
    expect(body.error).toMatch(/payload validation/i);
    expect(body.message).toMatch(/cep is invalid/i);
    expect(body.status).toEqual(400);
  });

  it('should be able to query valid zip code', async () => {
    cepsMocks.mockReturnValue(listCepWithStreetEmpty);
    CepService.search.mockImplementationOnce(() => cep1Result);

    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cep1);

    expect(body).toHaveProperty('cep');
    expect(body).toHaveProperty('logradouro');
    expect(body).toHaveProperty('complemento');
    expect(body).toHaveProperty('bairro');
    expect(body).toHaveProperty('localidade');
    expect(body).toHaveProperty('uf');
    expect(body).toHaveProperty('ibge');
    expect(body).toHaveProperty('gia');
    expect(body).toHaveProperty('ddd');
    expect(body.cep).toEqual('51170-110');
    expect(body.logradouro).toMatch(/Rua MOCKKK/i);
    expect(body.complemento).toEqual('');
    expect(body.bairro).toMatch(/imbiribeira/i);
    expect(body.localidade).toMatch(/Recife/i);
    expect(body.uf).toMatch(/pe/i);
    expect(body.ibge).toEqual('2611606');
    expect(body.gia).toEqual('');
    expect(body.ddd).toEqual('81');
  });

  it('Not Found query valid zip code without data', async () => {
    cepsMocks.mockReturnValue(listCepWithStreetEmpty);
    CepService.search.mockImplementationOnce(() => cepWithoutDataResult);

    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cep2);

    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.error).toEqual('not_found');
    expect(body.status).toEqual(404);
    expect(body.message).toMatch(/not found/i);
  });

  it('Must return an Internal Server error', async () => {
    CepService.search.mockRejectedValue(new Error('Generic Error'));

    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cep2);

    expect(body).toHaveProperty('error');
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.error).toEqual('internal_server_error');
    expect(body.status).toEqual(500);
    expect(body.message).toMatch(/internal server error/i);
  });

  it('Search for the zip code where the STREET is not empty, must be show the 6 position', async () => {
    cepsMocks.mockReturnValue(listCepWithStreetEmpty);

    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cep3);

    expect(body.cep).toEqual(22300000);
    expect(body.logradouro).toMatch(/Rua 05 MOCK TEST/i);
    expect(body.complemento).toEqual('');
    expect(body.bairro).toMatch(/recife 05/i);
    expect(body.localidade).toMatch(/Localidade 05/i);
    expect(body.uf).toMatch(/pe/i);
    expect(body.ibge).toEqual('');
    expect(body.gia).toEqual('');
    expect(body.ddd).toEqual('81');
  });

  it('Search for the zip code where the STREET is not empty, must be show the 3 position', async () => {
    cepsMocks.mockReturnValue(listCepWithStreetEmptyPosition3);

    const accessToken = AuthServer.buildToken({ payload });
    const { body } = await request(app)
      .post('/api/v1/cep/')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cep3);

    expect(body.cep).toEqual(22333900);
    expect(body.logradouro).toMatch(/Rua 03 MOCK TEST/i);
    expect(body.complemento).toEqual('');
    expect(body.bairro).toMatch(/Bairro 03/i);
    expect(body.localidade).toMatch(/Localidade 03/i);
    expect(body.uf).toMatch(/pe/i);
    expect(body.ibge).toEqual('');
    expect(body.gia).toEqual('');
    expect(body.ddd).toEqual('81');
  });
});
