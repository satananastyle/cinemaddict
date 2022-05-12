import RatingView from './view/rating-view.js';
import FiltersView from './view/filters-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsModel from './model/films-model.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');
const filmsPresenter = new FilmsPresenter();
const popupPresenter = new PopupPresenter();

const filmsModel = new FilmsModel();
const boardFilms = filmsModel.getFilms();

render(new RatingView(), siteHeaderElement);
render(new FiltersView(), siteMainElement);
render(new FooterStatisticsView(boardFilms), siteFooterStatisticsElement);

filmsPresenter.init(siteMainElement, filmsModel);
popupPresenter.init(siteFooterElement, filmsModel);
