import AppError from '@shared/errors/AppError';
import FakePlanetsRepository from '../repositories/fakes/FakePlanetsRepository';
import CreatePlanetService from './CreatePlanetService';

let fakePlanetsRepository: FakePlanetsRepository;

let createPlanet: CreatePlanetService;

describe('Create new planet', () => {
  beforeEach(() => {
    fakePlanetsRepository = new FakePlanetsRepository();

    createPlanet = new CreatePlanetService(fakePlanetsRepository);
  });

  it('should be able to create a new planet', async () => {
    const planet = await createPlanet.execute({
      name: 'Alderaan',
      climate: 'temperate',
      terrain: 'grasslands, mountains',
    });

    expect(planet).toHaveProperty('id');
  });
  it('should not be able to create a new planet with name of planet already exists', async () => {
    await createPlanet.execute({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
    });
    await expect(
      createPlanet.execute({
        name: 'Tatooine',
        climate: 'arid',
        terrain: 'dessert',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new planet with name of planet not exists in api', async () => {
    await expect(
      createPlanet.execute({
        name: 'wrong-name',
        climate: 'arid',
        terrain: 'dessert',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
