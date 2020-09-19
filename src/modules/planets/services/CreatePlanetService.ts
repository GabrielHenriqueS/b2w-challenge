import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import api from '../../../serviceApi/api';
import ICreatePlanetDTO from '../dtos/ICreatePlanetDTO';
import Planet from '../infra/typeorm/schemas/Planet';
import IPlanetsRepository from '../repositories/IPlanetsRepository';
import IResponseFilms from '../dtos/IResponseFilms';

@injectable()
class CreatePlanetService {
  constructor(
    @inject('PlanetsRepository')
    private planetsRepository: IPlanetsRepository,
  ) {}

  async execute({ name, climate, terrain }: ICreatePlanetDTO): Promise<Planet> {
    const planetExistsInDatabase = await this.planetsRepository.findByName(
      name,
    );

    if (planetExistsInDatabase)
      throw new AppError('Planet already exists', 401);

    const { data } = await api.get<IResponseFilms>('planets', {
      params: {
        search: name,
      },
    });

    const planetExistsInApi = data.results.find(
      planet =>
        planet.name.toLowerCase().includes(name.toLowerCase()) &&
        planet.climate.toLowerCase().includes(climate.toLowerCase()) &&
        planet.terrain.toLowerCase().includes(terrain.toLowerCase()),
    );

    if (!planetExistsInApi) throw new AppError('Planet not exists in api', 401);

    const planet = await this.planetsRepository.create({
      name: planetExistsInApi.name,
      climate: planetExistsInApi.climate,
      terrain: planetExistsInApi.terrain,
    });

    return planet;
  }
}

export default CreatePlanetService;
