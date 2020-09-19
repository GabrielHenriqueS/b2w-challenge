import IPlanetsRepository from '@modules/planets/repositories/IPlanetsRepository';
import ICreatePlanetDTO from '@modules/planets/dtos/ICreatePlanetDTO';
import { getMongoRepository, MongoRepository } from 'typeorm';
import Planet from '../schemas/Planet';

class PlanetsRepository implements IPlanetsRepository {
  private ormRepository: MongoRepository<Planet>;

  constructor() {
    this.ormRepository = getMongoRepository(Planet);
  }

  async create(data: ICreatePlanetDTO): Promise<Planet> {
    const planet = this.ormRepository.create(data);

    await this.ormRepository.save(planet);

    return planet;
  }

  async findByName(name: string): Promise<Planet> {
    const planet = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return planet;
  }

  async findAll(): Promise<Planet[]> {
    const planets = await this.ormRepository.find();
    return planets;
  }

  async findById(id: string): Promise<Planet> {
    const planet = await this.ormRepository.findOne(id);
    return planet;
  }

  async findByLikeName(name: string): Promise<Planet[]> {
    const planets = await this.ormRepository.find({
      where: {
        name: new RegExp(`.*${name}.*`),
      },
    });

    return planets;
  }

  async delete(planet: Planet): Promise<void> {
    await this.ormRepository.remove(planet);
  }
}

export default PlanetsRepository;
