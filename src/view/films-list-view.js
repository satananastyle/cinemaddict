import { createElement } from '../render.js';

const createFilmsListTemplate = (films) => (
  `<section class="films-list">
      ${films.length > 0
    ? '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>'
    : '<h2 class="films-list__title">There are no movies in our database</h2>'}
   </section>`
);

export default class FilmsListView {
  constructor(films) {
    this.films = films;
  }

  getTemplate() {
    return createFilmsListTemplate(this.films);
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
