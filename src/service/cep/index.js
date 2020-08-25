import axios from 'axios';
import InternalServerError from '../../lib/errors/internal-server-error';

class CepService {
  async search(cep) {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      return await axios.get(url);
    } catch (error) {
      throw new InternalServerError();
    }
  }
}

export default new CepService();
