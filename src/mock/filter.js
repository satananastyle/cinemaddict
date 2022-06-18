import { filterTypeToFilms } from '../utils/utils.js';

export const generateFilter = (films) => Object.entries(filterTypeToFilms).map(
  ([filterName, filterFilms]) => ({
    name: filterName,
    count: filterFilms(films).length,
  }),
);
