/* eslint-disable object-curly-newline */
import { CepDocument, CepCreateDefinition, cepTag, CepDefinition } from './cep';

module.exports = {
  swagger: '2.0',
  info: {
    version: '0.0.1',
    title: 'Cep API'
  },
  basePath: '/api/v1',
  tags: [cepTag],
  schemes: ['http', 'https'],
  securityDefinitions: {
    authentication: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },
  paths: {
    ...CepDocument
  },
  definitions: {
    CepCreate: CepCreateDefinition,
    Cep: CepDefinition
  }
};
