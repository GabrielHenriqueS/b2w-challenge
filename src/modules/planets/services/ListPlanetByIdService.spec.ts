import AppError from '@shared/errors/AppError';
import FakePlanetsRepository from '../repositories/fakes/FakePlanetsRepository';
import CreatePlanetService from './CreatePlanetService';
import ListPlanetByIdService from './ListPlanetByIdService';

let fakePlanetsRepository: FakePlanetsRepository;

let createPlanet: CreatePlanetService;
let listPlanetById: ListPlanetByIdService;

describe('List planet by id', () => {
  beforeEach(() => {
    fakePlanetsRepository = new FakePlanetsRepository();

    createPlanet = new CreatePlanetService(fakePlanetsRepository);
    listPlanetById = new ListPlanetByIdService(fakePlanetsRepository);
  });

  it('should be able to list planet by id', async () => {
    const planet = await createPlanet.execute({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
    });

    const planetFiltered = await listPlanetById.execute(String(planet.id));

    expect(planetFiltered.id).toEqual(planet.id);
  });

  it('should not be able to list planet with id not exists', async () => {
    await expect(
      listPlanetById.execute('non-exists-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
