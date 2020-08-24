class Cep {
  async cepSearch(req, res) {
    try {
      const { body } = req;
      res.status(200).json(body);
    } catch (error) {
      res.status(error.status).json(error);
    }
  }
}

export default new Cep();
