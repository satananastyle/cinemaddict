import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../utils/const.js';

const getFilterItemClass = (isActive) => isActive ? 'main-navigation__item--active' : '';
const getFiltersCount = (name, count) => name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`;

const createFilterItemTemplate = (filter, isActive = false) => {
  const { name, count } = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${getFilterItemClass(isActive)}">${name} ${getFiltersCount(name, count)}</a>`
  );
};

const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return (
    `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`
  );
};

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
