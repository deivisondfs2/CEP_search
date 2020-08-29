import createJWKSMock from 'mock-jwks';

class AuthServer {
  static start() {
    this.authServer = createJWKSMock('https://dev-deivison.us.auth0.com', '/.well-known/jwks.json');
    this.authServer.start();
  }

  static stop() {
    this.authServer.stop();
  }

  static buildToken({ payload }) {
    return this.authServer.token(payload);
  }
}

export default AuthServer;
