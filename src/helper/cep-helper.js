/* eslint-disable no-console */
/* eslint-disable object-curly-newline */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

import cepsMocks from './cep-mock-list';

export const findCEPMock = (cepOriginal) => {
  const sizeCEP = cepOriginal.toString().length + 1;
  let result = {};
  let cont = 0;

  for (let index = 0; index < sizeCEP; index++) {
    let cepForSearch = cepOriginal.toString();

    if (cont > 0) {
      const valorSlice = cepForSearch.slice(0, -cont);
      cepForSearch = valorSlice.padEnd(sizeCEP - 1, '0');
    }
    const cepFilter = cepsMocks().filter(
      (cepData) => cepData.cep === parseInt(cepForSearch) && cepData.logradouro !== ''
    );
    if (cepFilter && cepFilter.length === 1) {
      const [{ cep, logradouro, complemento, bairro, localidade, uf, ibge, gia, ddd }] = cepFilter;
      result = {
        data: {
          cep,
          logradouro,
          complemento,
          bairro,
          localidade,
          uf,
          ibge,
          gia,
          ddd
        }
      };
      break;
    } else {
      cont++;
    }
  }
  return result;
};
