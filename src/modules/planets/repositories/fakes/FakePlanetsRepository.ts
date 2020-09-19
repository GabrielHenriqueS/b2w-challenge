import ObjectId from 'bson-objectid';

import Planet from '@modules/planets/infra/typeorm/schemas/Planet';
import ICreatePlanetDTO from '@modules/planets/dtos/ICreatePlanetDTO';
import IPlanetsRepository from '../IPlanetsRepository';

class FakePlanetsRepository implements IPlanetsRepository {
  private planets: Planet[] = [];

  async create({ name, climate, terrain }: ICreatePlanetDTO): Promise<Planet> {
    const planet = new Planet();

    Object.assign(planet, {
      id: new ObjectId(),
      name,
      climate,
      terrain,
    });

    this.planets.push(planet);

    return planet;
  }

  async findByName(name: string): Promise<Planet> {
    return this.planets.find(planet => planet.name === name);
  }

  async findAll(): Promise<Planet[]> {
    return this.planets;
  }

  async findById(id: string): Promise<Planet> {
    return this.planets.find(planet => String(planet.id) === id);
  }

  async findByLikeName(name: string): Promise<Planet[]> {
    return this.planets.filter(planet =>
      planet.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  async delete(planet: Planet): Promise<void> {
    const planetIndex = this.planets.findIndex(pl => pl.id === planet.id);

    delete this.planets[planetIndex];
  }
}

export default FakePlanetsRepository;
