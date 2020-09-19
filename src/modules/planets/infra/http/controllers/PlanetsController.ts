import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatePlanetService from '@modules/planets/services/CreatePlanetService';
import ListPlanetService from '@modules/planets/services/ListPlanetService';
import ListPlanetByIdService from '@modules/planets/services/ListPlanetByIdService';
import DeletePlanetService from '@modules/planets/services/DeletePlanetService';

export default class PlanetsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, terrain, climate } = request.body;

    const createPlanet = container.resolve(CreatePlanetService);

    const planet = await createPlanet.execute({
      name,
      terrain,
      climate,
    });

    return response.json(planet);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPlanets = container.resolve(ListPlanetService);
    const planets = await listPlanets.execute();

    return response.json(classToClass(planets));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listPlanetById = container.resolve(ListPlanetByIdService);

    const planet = await listPlanetById.execute(id);

    return response.json(planet);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deletePlanet = container.resolve(DeletePlanetService);

    await deletePlanet.execute(id);

    return response.sendStatus(200);
  }
}
