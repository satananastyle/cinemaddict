import { createElement } from '../render.js';

const MESSAGES = {
  empty: 'There are no movies in our database',
  main: 'All movies.Upcoming',
  rated: 'Top rated',
  commented: 'Most commented'
};

const createFilmsListTemplate = (message) => (
  `<section class="films-list">
      <h2 class="films-list__title ${message === 'All movies.Upcoming' ? 'visually-hidden' : ''}">
        ${message}
      </h2>
   </section>`
);

class FilmsListView {
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


export { FilmsListView, MESSAGES };
