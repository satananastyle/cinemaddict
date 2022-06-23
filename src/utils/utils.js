import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { FilterType } from './const.js';

dayjs.extend(duration);

const formatRuntime = (minutes) => dayjs.duration(minutes, 'm').format('H[h] m[m]');

const formatDate = (date, format) => dayjs(date).format(format);

const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength)}…`
    : text;

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items.slice();
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const filterTypeToFilms = {
  [FilterType.ALL]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite),
};

const sortDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
const sortRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;


export { formatRuntime, formatDate, truncateText, filterTypeToFilms, updateItem, sortDate, sortRating };
