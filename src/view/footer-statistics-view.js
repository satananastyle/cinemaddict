import { createElement } from '../render.js';

const createFooterStatisticsTemplate = (films) => (`<p>${films.length} movies inside</p>`);

export default class FooterStatisticsView {
  constructor(films) {
    this.films = films;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this.films);
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
