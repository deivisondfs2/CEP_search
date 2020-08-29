export const cepTag = {
  name: 'cep',
  description: 'Operations about cep'
};

export const CepCreateDefinition = {
  type: 'object',
  properties: {
    cep: {
      type: 'integer'
    }
  },
  xml: {
    name: 'CepCreate'
  }
};

export const CepDefinition = {
  type: 'object',
  properties: {
    cep: {
      type: 'integer'
    },
    logradouro: {
      type: 'string'
    },
    complemento: {
      type: 'string'
    },
    bairro: {
      type: 'string'
    },
    localidade: {
      type: 'string'
    },
    uf: {
      type: 'string'
    },
    ibge: {
      type: 'string'
    },
    gia: {
      type: 'string'
    },
    ddd: {
      type: 'string'
    }
  },
  xml: {
    name: 'Cep'
  }
};

export const CepDocument = {
  '/cep': {
    post: {
      tags: ['cep'],
      summary: 'Search CEP',
      description: '',
      operationId: 'searchCep',
      consumes: ['application/json'],
      produces: ['application/json'],
      security: [
        {
          authentication: []
        }
      ],
      parameters: [
        {
          name: 'body',
          in: 'body',
          description: 'Cep object that needs to be search',
          required: true,
          schema: {
            $ref: '#/definitions/CepCreate'
          }
        }
      ],
      responses: {
        200: {
          description: 'Successful operation',
          schema: {
            $ref: '#/definitions/Cep'
          }
        },
        404: {
          description: 'Not found'
        },
        400: {
          description: 'Invalid input'
        },
        500: {
          description: 'Internal server error'
        }
      }
    }
  }
};
