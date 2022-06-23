import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardPresenter from './film-card-presenter.js';
import { render, remove } from '../framework/render.js';
import { FilmListTitle, SortType } from '../utils/const.js';
import { updateItem, sortDate, sortRating } from '../utils/utils.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #films = [];
  #mainContainerElement = null;
  #filmsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListContainer = new FilmsListContainerView();
  #filmsList = null;
  #sortComponent = new SortView();

  #showMoreButton = new ShowMoreButtonView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  #filmCardPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #sourcedFilms = [];

  constructor(mainContainerElement, filmsModel) {
    this.#mainContainerElement = mainContainerElement;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#sourcedFilms = [...this.#filmsModel.films];
    this.#renderFilmsList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainerElement);
    this.#sortComponent.setOnSortTypeChange(this.#handleSortTypeChange);
  };

  #renderFilmCard = (film) => {
    const filmCardPresenter = new FilmCardPresenter(this.#filmsListContainer.element, this.#filmsModel, this.#handleFilmChange, this.#handleModeChange);
    filmCardPresenter.init(film);

    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  };

  #renderFilms = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach(this.#renderFilmCard);
  };

  #renderEmptyList = () => {
    this.#filmsList = new FilmsListView(FilmListTitle.EMPTY);
    render(this.#filmsComponent, this.#mainContainerElement);
    render(this.#filmsList, this.#filmsComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#filmsList.element);

    this.#showMoreButton.setOnClick(this.#handleShowMoreButtonClick);
  };

  #renderMainFilmsList = () => {
    this.#filmsList = new FilmsListView(FilmListTitle.MAIN);

    this.#renderFilms(0, Math.min(this.#films.length, FILM_COUNT_PER_STEP));

    render(this.#filmsListContainer, this.#filmsList.element);
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }

    render(this.#filmsList, this.#filmsComponent.element);
  };

  #renderFilmsList = () => {
    if (this.#filmsModel.isEmpty()) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();

    render(this.#filmsComponent, this.#mainContainerElement);
    this.#renderMainFilmsList();
  };

  #clearFilmsList = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#filmsList);
    remove(this.#showMoreButton);
  };

  #sortFilms = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortDate);
        break;

      case SortType.RATING:
        this.#films.sort(sortRating);
        break;

      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#films = [...this.#sourcedFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmsList();
    this.#renderMainFilmsList();
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedFilms = updateItem(this.#sourcedFilms, updatedFilm);
    this.#filmCardPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);

    this.#renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#showMoreButton);
    }
  };

  #handleModeChange = () => {
    this.#filmCardPresenter.forEach((presenter) => presenter.resetView());
  };
}
