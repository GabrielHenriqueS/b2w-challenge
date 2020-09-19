import Planet from '../infra/typeorm/schemas/Planet';
import ICreatePlanetDTO from '../dtos/ICreatePlanetDTO';

export default interface IPlanetsRepository {
  create(data: ICreatePlanetDTO): Promise<Planet>;
  findByName(name: string): Promise<Planet>;
  findByLikeName(name: string): Promise<Planet[]>;
  findAll(): Promise<Planet[]>;
  findById(id: string): Promise<Planet>;
  delete(planet: Planet): Promise<void>;
}
