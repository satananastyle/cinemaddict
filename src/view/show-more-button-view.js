import AbstractView from '../framework/view/abstract-view.js';

const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setOnClick = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onClick);
  };

  #onClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
