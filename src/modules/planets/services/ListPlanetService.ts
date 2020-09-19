import { injectable, inject } from 'tsyringe';
import IPlanetsRepository from '../repositories/IPlanetsRepository';
import Planet from '../infra/typeorm/schemas/Planet';
import listFilmsNumberByApi from '../functions/listFilmsNumberByApi';

@injectable()
class ListPlanetService {
  constructor(
    @inject('PlanetsRepository')
    private planetsRepository: IPlanetsRepository,
  ) {}

  async execute(): Promise<Planet[]> {
    const planets = await this.planetsRepository.findAll();
    const planetsResponse = await listFilmsNumberByApi(planets);
    return planetsResponse;
  }
}

export default ListPlanetService;
