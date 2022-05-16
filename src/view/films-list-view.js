import { createElement } from '../render.js';
import { FilmListTitle } from '../const.js';

const createFilmsListTemplate = (message) => (
  `<section class="films-list">
      <h2 class="films-list__title ${message === FilmListTitle.MAIN ? 'visually-hidden' : ''}">
        ${message}
      </h2>
   </section>`
);

export default class FilmsListView {
  constructor(message) {
    this.message = message;
  }

  getTemplate() {
    return createFilmsListTemplate(this.message);
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
