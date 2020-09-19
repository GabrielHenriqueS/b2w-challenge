import AppError from '@shared/errors/AppError';
import FakePlanetsRepository from '../repositories/fakes/FakePlanetsRepository';
import CreatePlanetService from './CreatePlanetService';
import DeletePlanetService from './DeletePlanetService';

let fakePlanetsRepository: FakePlanetsRepository;

let createPlanet: CreatePlanetService;
let deletePlanet: DeletePlanetService;

describe('Delete planet', () => {
  beforeEach(() => {
    fakePlanetsRepository = new FakePlanetsRepository();

    createPlanet = new CreatePlanetService(fakePlanetsRepository);
    deletePlanet = new DeletePlanetService(fakePlanetsRepository);
  });

  it('should be able to delete a planet', async () => {
    const fnDeletePlanet = jest.spyOn(fakePlanetsRepository, 'delete');

    const planet = await createPlanet.execute({
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
    });

    await deletePlanet.execute(String(planet.id));

    expect(fnDeletePlanet).toHaveBeenCalled();
  });
  it('should not be able to delete planet with id non exists', async () => {
    await expect(
      deletePlanet.execute('wrong-planet-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
