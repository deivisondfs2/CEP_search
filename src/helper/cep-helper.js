/* eslint-disable object-curly-newline */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */

const cepsMocks = [
  {
    cep: 22333999,
    logradouro: '',
    complemento: '',
    bairro: 'Bairro 01',
    localidade: 'Localidade 01',
    uf: 'PE',
    ibge: '',
    gia: '',
    ddd: '81'
  },
  {
    cep: 22333990,
    logradouro: '',
    complemento: '',
    bairro: 'Bairro 01',
    localidade: 'Localidade 01',
    uf: 'PE',
    ibge: '',
    gia: '',
    ddd: '81'
  },
  {
    cep: 22333900,
    logradouro: '',
    complemento: '',
    bairro: 'Bairro 01',
    localidade: 'Localidade 01',
    uf: 'PE',
    ibge: '',
    gia: '',
    ddd: '81'
  },
  {
    cep: 22333000,
    logradouro: '',
    complemento: '',
    bairro: 'Bairro 01',
    localidade: 'Localidade 01',
    uf: 'PE',
    ibge: '',
    gia: '',
    ddd: '81'
  },
  {
    cep: 22330000,
    logradouro: '',
    complemento: '',
    bairro: 'Bairro 01',
    localidade: 'Localidade 01',
    uf: 'PE',
    ibge: '',
    gia: '',
    ddd: '81'
  },
  {
    cep: 22300000,
    logradouro: 'Rua 05',
    complemento: '',
    bairro: 'Recife 05',
    localidade: 'Localidade 05',
    uf: 'PE',
    ibge: '',
    gia: '',
    ddd: '81'
  }
];

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
    const cepFilter = cepsMocks.filter(
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
  //cepsMocks;
};
