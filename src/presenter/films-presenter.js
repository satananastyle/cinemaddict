import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupPresenter from './popup-presenter.js';
import { render, remove } from '../framework/render.js';
import { FilmListTitle } from '../utils/const.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #films = [];
  #mainContainerElement = null;
  #filmsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListContainer = new FilmsListContainerView();
  #filmsList = null;
  #popupComponent = null;

  #showMoreButton = new ShowMoreButtonView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  constructor(mainContainerElement, filmsModel) {
    this.#mainContainerElement = mainContainerElement;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmsList();
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardView(film);

    const openFullInfo = () => {
      if (this.#popupComponent) {
        this.#popupComponent.delete();
        this.#popupComponent = null;
      }
      this.#popupComponent = new PopupPresenter(this.#filmsModel);
      this.#popupComponent.init(film);
    };

    filmComponent.setOnLinkClick(() => {
      openFullInfo();
    });

    render(filmComponent, this.#filmsListContainer.element);
  };

  #renderFilmsList = () => {
    if (this.#filmsModel.isEmpty()) {
      this.#filmsList = new FilmsListView(FilmListTitle.EMPTY);
      render(this.#filmsComponent, this.#mainContainerElement);
      render(this.#filmsList, this.#filmsComponent.element);
      return;
    }

    this.#filmsList = new FilmsListView(FilmListTitle.MAIN);
    render(new SortView(), this.#mainContainerElement);
    render(this.#filmsListContainer, this.#filmsList.element);

    for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#films[i], this.#filmsModel);
    }

    if (this.#films.length > FILM_COUNT_PER_STEP) {
      render(this.#showMoreButton, this.#filmsList.element);

      this.#showMoreButton.setOnElementClick(this.#onShowMoreButtonClick);
    }

    render(this.#filmsComponent, this.#mainContainerElement);
    render(this.#filmsList, this.#filmsComponent.element);
  };

  #onShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .forEach(this.#renderFilm);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButton);
    }
  };
}
