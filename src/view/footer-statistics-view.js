import { createElement } from '../render.js';

const formatNumbers = (count) => new Intl.NumberFormat('ru-RU').format(count);

const createFooterStatisticsTemplate = (count) => `<p>${formatNumbers(count)} movies inside</p>`;

export default class FooterStatisticsView {
  constructor(count) {
    this.count = count;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this.count);
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
