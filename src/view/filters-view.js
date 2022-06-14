import AbstractView from '../framework/view/abstract-view.js';

const getFilterItemClass = (isActive) => isActive ? 'main-navigation__item--active' : '';

const createFilterItemTemplate = (filter, isActive = false) => {
  const { name, count } = filter;
  return (
    `<a href="#${name}" class="main-navigation__item ${getFilterItemClass(isActive)}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');
  return (
    `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
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
