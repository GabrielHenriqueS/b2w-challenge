import FakePlanetsRepository from '../repositories/fakes/FakePlanetsRepository';
import CreatePlanetService from './CreatePlanetService';
import ListPlanetByNameService from './ListPlanetByNameService';

let fakePlanetsRepository: FakePlanetsRepository;

let createPlanet: CreatePlanetService;
let listPlanetByLikeName: ListPlanetByNameService;

describe('List planet by name', () => {
  beforeEach(() => {
    fakePlanetsRepository = new FakePlanetsRepository();

    createPlanet = new CreatePlanetService(fakePlanetsRepository);
    listPlanetByLikeName = new ListPlanetByNameService(fakePlanetsRepository);
  });

  it('should be able to list planet by id', async () => {
    await createPlanet.execute({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
    });

    const planet1 = await createPlanet.execute({
      name: 'Alderaan',
      climate: 'temperate',
      terrain: 'grasslands, mountains',
    });

    const planets = await listPlanetByLikeName.execute('Alderaan');

    expect(planets).toMatchObject([planet1]);
  }, 30000);
});
