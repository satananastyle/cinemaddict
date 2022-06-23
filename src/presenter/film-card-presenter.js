import { render, replace, remove } from '../framework/render.js';
import FilmCardView from '../view/film-card-view.js';
import PopupPresenter from './popup-presenter.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  OPENED: 'OPENED',
};

export default class FilmCardPresenter {
  #filmsListContainer = null;
  #filmCardComponent = null;
  #popupComponent = null;

  #film = null;
  #filmsModel = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor(filmsListContainer, filmsModel, changeData, changeMode) {
    this.#filmsListContainer = filmsListContainer;
    this.#filmsModel = filmsModel;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#film = film;
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setOnLinkClick(() => {
      if (this.#mode === Mode.OPENED) {
        this.#closeFullInfo();
        this.#openFullInfo();
      } else {
        this.#openFullInfo();
      }
    });

    this.#filmCardComponent.setOnAddToWatchlistClick(this.#handleAddToWatchlistClick);
    this.#filmCardComponent.setOnAlreadyWatchedClick(this.#handleAlreadyWatchedClick);
    this.#filmCardComponent.setOnFavoriteClick(this.#handleFavoriteClick);

    if (prevFilmCardComponent === null) {
      render(this.#filmCardComponent, this.#filmsListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
    }

    if (this.#mode === Mode.OPENED) {
      replace(this.#filmCardComponent, prevFilmCardComponent);
      this.#closeFullInfo();
      this.#openFullInfo();
    }

    remove(prevFilmCardComponent);
  };

  destroy = () => {
    remove(this.#filmCardComponent);
    remove(this.#popupComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#closeFullInfo();
    }
  };

  #openFullInfo = () => {
    this.#popupComponent = new PopupPresenter(this.#filmsModel, this.#changeData);
    this.#popupComponent.init(this.#film);

    this.#changeMode();
    this.#mode = Mode.OPENED;
  };

  #closeFullInfo = () => {
    this.#popupComponent.destroy();
    this.#popupComponent = null;
    this.#mode = Mode.DEFAULT;
  };

  #handleAddToWatchlistClick = () => {
    const newUserDetails = { ...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist };
    this.#changeData({ ...this.#film, userDetails: newUserDetails });
  };

  #handleAlreadyWatchedClick = () => {
    const newUserDetails = { ...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched };
    this.#changeData({ ...this.#film, userDetails: newUserDetails });
  };

  #handleFavoriteClick = () => {
    const newUserDetails = { ...this.#film.userDetails, favorite: !this.#film.userDetails.favorite };
    this.#changeData({ ...this.#film, userDetails: newUserDetails });
  };
}

