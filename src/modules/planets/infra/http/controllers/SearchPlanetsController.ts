import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListPlanetByNameService from '@modules/planets/services/ListPlanetByNameService';

export default class SearchPlanetsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const listPlanetByName = container.resolve(ListPlanetByNameService);

    const planets = await listPlanetByName.execute(String(name));

    return response.json(planets);
  }
}
