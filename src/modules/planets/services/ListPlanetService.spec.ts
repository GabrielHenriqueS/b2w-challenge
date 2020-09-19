import FakePlanetsRepository from '../repositories/fakes/FakePlanetsRepository';
import ListPlanetService from './ListPlanetService';
import CreatePlanetService from './CreatePlanetService';

let fakePlanetsRepository: FakePlanetsRepository;

let listPlanets: ListPlanetService;
let createPlanet: CreatePlanetService;

describe('List all planets', () => {
  beforeEach(() => {
    fakePlanetsRepository = new FakePlanetsRepository();

    listPlanets = new ListPlanetService(fakePlanetsRepository);

    createPlanet = new CreatePlanetService(fakePlanetsRepository);
  });

  it('should be able to list all planets', async () => {
    const planet = await createPlanet.execute({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
    });

    const planet1 = await createPlanet.execute({
      name: 'Alderaan',
      climate: 'temperate',
      terrain: 'grasslands, mountains',
    });

    const planets = await listPlanets.execute();

    expect(planets).toMatchObject([planet, planet1]);
  }, 30000);
});
