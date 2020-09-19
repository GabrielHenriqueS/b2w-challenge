import { container } from 'tsyringe';

import IPlanetsRepository from '@modules/planets/repositories/IPlanetsRepository';
import PlanetsRepository from '@modules/planets/infra/typeorm/repositories/PlanetsRepository';

container.registerSingleton<IPlanetsRepository>(
  'PlanetsRepository',
  PlanetsRepository,
);
