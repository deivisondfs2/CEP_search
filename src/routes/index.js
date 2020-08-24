import { Router } from 'express';
import cep from './cep';

const routes = new Router();

routes.use('/api/v1/cep', cep);

export default routes;
