import { createElement } from '../render.js';

const formatNumbers = (count) => new Intl.NumberFormat('ru-RU').format(count);

const createFooterStatisticsTemplate = (count) => `<p>${formatNumbers(count)} movies inside</p>`;

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
