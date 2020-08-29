/* eslint-disable spaced-comment */
/* eslint-disable global-require */

import AuthServer from '../lib/auth-server';

describe('API', () => {
  beforeEach(() => {
    AuthServer.start();
  });

  afterEach(() => {
    AuthServer.stop();
  });

  require('./cep');
  require('./auth-token');
});
