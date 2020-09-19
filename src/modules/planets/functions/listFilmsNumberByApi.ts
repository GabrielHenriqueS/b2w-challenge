import api from '../../../serviceApi/api';
import IResponseFilms from '../dtos/IResponseFilms';
import Planet from '../infra/typeorm/schemas/Planet';

export default async (data: Planet[]): Promise<Planet[]> => {
  const response = await Promise.all(
    data.map(async planet => {
      const response = await api.get<IResponseFilms>('planets', {
        params: {
          search: planet.name,
        },
      });
      return {
        ...planet,
        films: response.data.results[0].films.length,
      };
    }),
  );

  return response;
};
