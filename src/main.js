import RatingView from './view/rating-view.js';
import FiltersView from './view/filters-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsModel from './model/films-model.js';
import { render } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const filmsModel = new FilmsModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel);

const filters = generateFilter(filmsModel.films);

render(new RatingView(), siteHeaderElement);
render(new FiltersView(filters), siteMainElement);
render(new FooterStatisticsView(filmsModel.films.length), siteFooterStatisticsElement);

filmsPresenter.init();

