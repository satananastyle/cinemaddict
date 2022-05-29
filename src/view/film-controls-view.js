import { createElement } from '../render.js';

const getControlsItemClass = (isActive) => (isActive ? 'film-details__control-button--active' : '');

const createControlButtonTemplate = (control, text, isActive = false) => (
  `<button type="button" class="film-details__control-button film-details__control-button--${control} ${getControlsItemClass(isActive)}">${text}</button>`
);

const createFilmControlsTemplate = ({ watchlist, alreadyWatched, favorite }) => (
  `<section class="film-details__controls">
     ${createControlButtonTemplate('watchlist', 'Add to watchlist', watchlist)}
     ${createControlButtonTemplate('watched', 'Already watched', alreadyWatched)}
     ${createControlButtonTemplate('favorite', 'Add to favorites', favorite)}
   </section>`
);

export default class FilmControlsView {
  #element = null;
  #userDetails = null;

  constructor(userDetails) {
    this.#userDetails = userDetails;
  }

  get template() {
    return createFilmControlsTemplate(this.#userDetails);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
