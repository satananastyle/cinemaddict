import RatingView from './view/rating-view.js';
import FiltersView from './view/filters-view.js';
import SortView from './view/sort-view.js';
import BtnMoreView from './view/btn-more-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

render(new RatingView(), siteHeaderElement);
render(new FiltersView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new BtnMoreView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);
