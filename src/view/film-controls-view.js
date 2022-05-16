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
  constructor(userDetails) {
    this.userDetails = userDetails;
  }

  getTemplate() {
    return createFilmControlsTemplate(this.userDetails);
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
