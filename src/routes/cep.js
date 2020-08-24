import { Router } from 'express';

import cepController from '../controllers/cep/cep-controller';
import validations from '../controllers/cep/validation';
import ValidateError from '../lib/errors/validate-error';

const cep = new Router();

const validation = async (req, res, next) => {
  await validations
    .validateCep()
    .validate(req.body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((errors) => {
      const payloadErrors = errors.inner.map((err) => ({ field: err.path, message: err.message }));
      res.status(400).json(new ValidateError(payloadErrors, 'Payload validation'));
    });
};

cep.post('/', validation, cepController.cepSearch);

export default cep;
