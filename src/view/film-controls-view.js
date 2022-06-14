import AbstractView from '../framework/view/abstract-view.js';

const getControlsItemClass = (isActive) => isActive ? 'film-details__control-button--active' : '';

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

export default class FilmControlsView extends AbstractView {
  #userDetails = null;

  constructor(userDetails) {
    super();
    this.#userDetails = userDetails;
  }

  get template() {
    return createFilmControlsTemplate(this.#userDetails);
  }
}
