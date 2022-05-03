import RatingView from './view/rating-view.js';
import FiltersView from './view/filters-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
// import PopupPresenter from './presenter/popup-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
// const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter();
// const popupPresenter = new PopupPresenter();

render(new RatingView(), siteHeaderElement);
render(new FiltersView(), siteMainElement);
render(new FooterStatisticsView(), siteFooterStatisticsElement);

filmsPresenter.init(siteMainElement);
// popupPresenter.init(siteFooterElement);
