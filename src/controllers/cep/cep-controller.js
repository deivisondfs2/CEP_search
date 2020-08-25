import CepService from '../../service/cep';
import NotFoundError from '../../lib/errors/not-found-error';

class Cep {
  async cepSearch(req, res) {
    try {
      const {
        body: { cep }
      } = req;
      const result = await CepService.search(cep);
      const { data } = result;
      if (!data.erro) {
        res.status(200).json(data);
        return;
      }
      res.status(404).json(new NotFoundError());
    } catch (error) {
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
