import * as Yup from 'yup';

const cepValidation = {
  cep: Yup.string()
    .matches(/^[0-9]{8}$/, 'CEP invalid: Must be exactly 8 digits and only numbers')
    .required()
};

export default {
  validateCep: () => Yup.object().shape(cepValidation)
};
