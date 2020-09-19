import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPlanetsRepository from '../repositories/IPlanetsRepository';

@injectable()
class DeletePlanetService {
  constructor(
    @inject('PlanetsRepository')
    private planetsRepository: IPlanetsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const planet = await this.planetsRepository.findById(id);

    if (!planet) throw new AppError('Planet not find', 401);

    await this.planetsRepository.delete(planet);
  }
}
export default DeletePlanetService;
