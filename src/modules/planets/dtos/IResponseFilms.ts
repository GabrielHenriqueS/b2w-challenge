export default interface IResponseFilms {
  results: [
    {
      name: string;
      terrain: string;
      climate: string;
      films: [];
    },
  ];
}
