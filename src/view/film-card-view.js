import { createElement } from '../render.js';
import { formatDate, formatRuntime } from '../utils.js';

const RELEASE_DATE_FORMAT = 'YYYY';

const MAX_DESCRIPTION_LENGHT = 140;

const getShortDescription = (description) => {
  if (description.split('').length > MAX_DESCRIPTION_LENGHT) {
    description = `${description.slice(0, MAX_DESCRIPTION_LENGHT)}...`;
  }
  return description;
};

const getControlsItemClass = (isActive) => {
  const classActiveButton = isActive
    ? 'film-card__controls-item--active'
    : '';

  return classActiveButton;
};

const createFilmControlsTemplate = (isWatchlist, isWatched, isFavorite) => (
  `<form class="film-card__controls">
     <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${getControlsItemClass(isWatchlist)}">Add to watchlist</button>
     <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${getControlsItemClass(isWatched)}">Mark as watched</button>
     <button class="film-card__controls-item button film-card__controls-item--favorite ${getControlsItemClass(isFavorite)}">Mark as favorite</button>
   </form>`
);

const createFilmCardTemplate = (film) => {
  const { filmInfo, userDetails } = film;
  const info = {
    title: filmInfo.title,
    rating: filmInfo.totalRating,
    date: formatDate(filmInfo.release.date, RELEASE_DATE_FORMAT),
    runtime: formatRuntime(filmInfo.runtime),
    genre: filmInfo.genres[0],
    poster: filmInfo.poster,
    description: getShortDescription(filmInfo.description),
    comments: film.comments.length,
    watchlist: userDetails.watchlist,
    alreadyWatched: userDetails.alreadyWatched,
    favorite: userDetails.favorite
  };
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${info.title}</h3>
        <p class="film-card__rating">${info.rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${info.date}</span>
          <span class="film-card__duration">${info.runtime}</span>
          <span class="film-card__genre">${info.genre}</span>
        </p>
        <img src="${info.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${info.description}</p>
        <span class="film-card__comments">${info.comments} comments</span>
      </a>
      ${createFilmControlsTemplate(info.watchlist, info.alreadyWatched, info.favorite)}
   </article>`
  );
};

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
