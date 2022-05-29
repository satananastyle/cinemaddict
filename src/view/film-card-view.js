import { createElement } from '../render.js';
import { formatDate, formatRuntime, truncateText } from '../utils.js';

const RELEASE_DATE_FORMAT = 'YYYY';

const MAX_DESCRIPTION_LENGTH = 140;

const getControlsItemClass = (isActive) => (isActive ? 'film-card__controls-item--active' : '');

const createControlButtonTemplate = (control, text, isActive = false) => (
  `<button class="film-card__controls-item film-card__controls-item--${control} ${getControlsItemClass(isActive)}">${text}</button>`
);

const createFilmControlsTemplate = ({ watchlist, alreadyWatched, favorite }) => (
  `<form class="film-card__controls">
     ${createControlButtonTemplate('add-to-watchlist', 'Add to watchlist', watchlist)}
     ${createControlButtonTemplate('mark-as-watched', 'Mark as watched', alreadyWatched)}
     ${createControlButtonTemplate('favorite', 'Mark as favorite', favorite)}
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
    description: truncateText(filmInfo.description, MAX_DESCRIPTION_LENGTH),
    comments: film.comments.length,
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
      ${createFilmControlsTemplate(userDetails)}
   </article>`
  );
};

export default class FilmCardView {
  #element = null;
  #film = null;

  constructor(film) {
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get openLink() {
    return this.element.querySelector('.film-card__link');
  }

  removeElement() {
    this.#element = null;
  }
}
