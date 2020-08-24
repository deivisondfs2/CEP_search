import * as Yup from 'yup';

const cepValidation = {
  cep: Yup.string()
    .matches(/^[0-9]{8}$/, 'Must be exactly 8 digits')
    .required()
};

export default {
  validateCep: () => Yup.object().shape(cepValidation)
};
