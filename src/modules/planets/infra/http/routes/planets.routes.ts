import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PlanetsController from '../controllers/PlanetsController';
import SearchPlanetsController from '../controllers/SearchPlanetsController';

const planetsRouter = Router();
const planetsController = new PlanetsController();
const searchPlanetsController = new SearchPlanetsController();

planetsRouter.get(
  '/list',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  searchPlanetsController.show,
);

planetsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      terrain: Joi.string().required(),
      climate: Joi.string().required(),
    }),
  }),
  planetsController.create,
);

planetsRouter.get('/', planetsController.index);

planetsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  planetsController.show,
);

planetsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  planetsController.delete,
);

export default planetsRouter;
