import { injectable, inject } from 'tsyringe';
import Planet from '../infra/typeorm/schemas/Planet';
import IPlanetsRepository from '../repositories/IPlanetsRepository';
import listFilmsNumberByApi from '../functions/listFilmsNumberByApi';

@injectable()
class ListPlanetByNameService {
  constructor(
    @inject('PlanetsRepository')
    private planetsRepository: IPlanetsRepository,
  ) {}

  async execute(name: string): Promise<Planet[]> {
    const planets = await this.planetsRepository.findByLikeName(name);
    const planetsResponse = await listFilmsNumberByApi(planets);
    return planetsResponse;
  }
}

export default ListPlanetByNameService;
