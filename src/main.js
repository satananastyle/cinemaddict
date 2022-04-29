import RatingView from './view/rating-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(new RatingView(), siteHeaderElement);
render(new FiltersView(), siteMainElement);
render(new SortView(), siteMainElement);
