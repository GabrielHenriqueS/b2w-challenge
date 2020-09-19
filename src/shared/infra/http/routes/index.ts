import { Router } from 'express';

import planetsRouter from '@modules/planets/infra/http/routes/planets.routes';

const routes = Router();

routes.use('/planets', planetsRouter);

export default routes;
