import { render } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class FilmCardPresenter {
  #filmsListContainer = null;
  #filmCardComponent = null;

  #popupComponent = null;
  #film = null;
  #filmsModel = null;

  constructor(filmsListContainer, filmsModel) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmsModel = filmsModel;
  }

  init = (film) => {
    this.#film = film;
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setOnLinkClick(() => {
      this.#openFullInfo();
    });

    render(this.#filmCardComponent, this.#filmsListContainer.element);
  };

  #openFullInfo = () => {
    if (this.#popupComponent) {
      this.#popupComponent.delete();
      this.#popupComponent = null;
    }
    this.#popupComponent = new PopupPresenter(this.#filmsModel);
    this.#popupComponent.init(this.#film);
  };
}

