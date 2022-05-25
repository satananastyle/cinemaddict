import { createElement } from '../render.js';

const formatCounter = new Intl.NumberFormat('ru-RU').format;

const createFooterStatisticsTemplate = (count) => `<p>${formatCounter(count)} movies inside</p>`;

export default class FooterStatisticsView {
  #element = null;
  #count = null;

  constructor(count) {
    this.#count = count;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#count);
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
