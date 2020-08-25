/* eslint-disable no-plusplus */
import CepService from '../../service/cep';
import NotFoundError from '../../lib/errors/not-found-error';
import { findCEPMock } from '../../helper/cep-helper';

class Cep {
  async cepSearch(req, res) {
    try {
      const {
        body: { cep }
      } = req;

      let result = findCEPMock(cep);
      if (result && !result.data) {
        result = await CepService.search(cep);
      }
      const { data } = result;
      if (data && !data.erro) {
        res.status(200).json(data);
        return;
      }
      res.status(404).json(new NotFoundError());
    } catch (error) {
      console.log(error);
      const status = error.response.status || error.status;
      if (status === 400 || status === 404) {
        res.status(status).json(new NotFoundError());
      } else {
        res.status(status).json(error);
      }
    }
  }
}

export default new Cep();
