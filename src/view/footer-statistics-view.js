import AbstractView from '../framework/view/abstract-view.js';

const formatCounter = new Intl.NumberFormat('ru-RU').format;

const createFooterStatisticsTemplate = (count) => `<p>${formatCounter(count)} movies inside</p>`;

export default class FooterStatisticsView extends AbstractView {
  #count = null;

  constructor(count) {
    super();
    this.#count = count;
  }

  get template() {
    return createFooterStatisticsTemplate(this.#count);
  }
}
