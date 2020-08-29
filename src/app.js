/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import JwksRsa from 'jwks-rsa';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import UnauthorizedError from './lib/errors/unauthorized-error';
import swaggerDocument from './docs';

class App {
  constructor() {
    this.app = express();
    this.swagger();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(this.checkJwt);
  }

  checkJwt(req, res, next) {
    jwt({
      secret: JwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-deivison.us.auth0.com/.well-known/jwks.json'
      }),

      audience: 'http://localhost:8080/api/',
      issuer: 'https://dev-deivison.us.auth0.com/',
      algorithm: ['RS256']
    })(req, res, next);
  }

  routes() {
    this.app.use(routes);
    this.app.use(this.routerNotFound);
    this.app.use(this.errorHandler);
  }

  swagger() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  routerNotFound(req, res, next) {
    const err = new Error('Not found');
    err.status = 404;
    err.code = 'not_found';
    next(err);
  }

  errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json(new UnauthorizedError());
    }
    res.status(err.status || 500);
    return res.json({
      error_description: err.message,
      status_code: err.status,
      error: err.code
    });
  }
}

export default new App().app;
