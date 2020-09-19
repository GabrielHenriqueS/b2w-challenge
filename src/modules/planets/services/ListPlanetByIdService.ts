import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import api from '../../../serviceApi/api';
import Planet from '../infra/typeorm/schemas/Planet';
import IPlanetsRepository from '../repositories/IPlanetsRepository';
import IResponseFilms from '../dtos/IResponseFilms';

@injectable()
class ListPlanetByIdService {
  constructor(
    @inject('PlanetsRepository')
    private planetsRepository: IPlanetsRepository,
  ) {}

  async execute(id: string): Promise<Planet> {
    const planet = await this.planetsRepository.findById(id);
    if (!planet) throw new AppError('Planet not found');

    const response = await api.get<IResponseFilms>('planets', {
      params: {
        search: planet.name,
      },
    });

    const planetResponse = {
      ...planet,
      films: response.data.results[0].films.length,
    };
    return planetResponse;
  }
}

export default ListPlanetByIdService;
