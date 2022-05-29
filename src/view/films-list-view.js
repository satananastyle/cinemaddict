import { createElement } from '../render.js';
import { FilmListTitle } from '../const.js';

const createFilmsListTemplate = (title) => (
  `<section class="films-list">
      <h2 class="films-list__title ${title === FilmListTitle.MAIN ? 'visually-hidden' : ''}">
        ${title}
      </h2>
   </section>`
);

export default class FilmsListView {
  #element = null;
  #title = null;

  constructor(title) {
    this.#title = title;
  }

  get template() {
    return createFilmsListTemplate(this.#title);
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
