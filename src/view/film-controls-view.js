import { createElement } from '../render.js';

const getControlsItemClass = (isActive) => {
  const classActiveButton = isActive
    ? 'film-details__control-button--active'
    : '';

  return classActiveButton;
};

const createFilmControlsTemplate = (film) => {
  const { userDetails } = film;
  return (
    `<section class="film-details__controls">
       <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getControlsItemClass(userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
       <button type="button" class="film-details__control-button film-details__control-button--watched ${getControlsItemClass(userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
       <button type="button" class="film-details__control-button film-details__control-button--favorite ${getControlsItemClass(userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
     </section>`
  );
};


export default class FilmControlsView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmControlsTemplate(this.film);
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
