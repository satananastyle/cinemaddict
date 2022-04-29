import RatingView from './view/rating-view.js';
import FiltersView from './view/filters-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import PopapPresenter from './presenter/popap-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const body = document.querySelector('body');
const filmsPresenter = new FilmsPresenter();
const popapPresenter = new PopapPresenter();

render(new RatingView(), siteHeaderElement);
render(new FiltersView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);

filmsPresenter.init(siteMainElement);
popapPresenter.init(body);
