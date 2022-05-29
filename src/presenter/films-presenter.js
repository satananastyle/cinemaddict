import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import PopupPresenter from './popup-presenter.js';
import { render } from '../render.js';
import { FilmListTitle } from '../const.js';

export default class FilmsPresenter {
  #films = [];
  #mainContainerElement = null;
  #filmsModel = null;

  #filmsComponent = new FilmsView();
  #filmsListContainer = new FilmsListContainerView();
  #filmsList = null;
  #popupComponent = null;

  constructor(mainContainerElement, filmsModel) {
    this.#mainContainerElement = mainContainerElement;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmsList();
  };

  #renderFilms = (film) => {
    const filmComponent = new FilmCardView(film);

    const openFullInfo = () => {
      if (this.#popupComponent) {
        this.#popupComponent.delete();
        this.#popupComponent = null;
      }
      this.#popupComponent = new PopupPresenter(this.#filmsModel);
      this.#popupComponent.init(film);
    };

    filmComponent.openLink.addEventListener('click', (evt) => {
      evt.preventDefault();
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

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilms(this.#films[i], this.#filmsModel);
    }

    render(new ShowMoreButtonView(), this.#filmsList.element);

    render(this.#filmsComponent, this.#mainContainerElement);
    render(this.#filmsList, this.#filmsComponent.element);
  };
}
