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
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${formatDate(filmInfo.release.releaseDate, RELEASE_DATE_FORMAT)}</span>
          <span class="film-card__duration">${formatRuntime(filmInfo.runtime)}</span>
          <span class="film-card__genre">${filmInfo.genre[0]}</span>
        </p>
        <img src="${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${getShortDescription(filmInfo.description)}</p>
        <span class="film-card__comments">5 comments</span>
      </a>
      ${createFilmControlsTemplate(userDetails.watchlist, userDetails.alreadyWatched, userDetails.favorite)}
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
