import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { remove, render } from '../framework/render.js';

export default class PopupPresenter {
  #openedFilm = null;
  #comments = [];
  #popupComponent = null;
  #controlsComponent = null;
  #filmsModel = null;
  #changeData = null;

  constructor(filmsModel, changeData) {
    this.#filmsModel = filmsModel;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#openedFilm = film;
    this.#comments = this.#filmsModel.getComments(this.#openedFilm.comments.length);
    this.#popupComponent = new PopupView(this.#comments);
    this.#controlsComponent = new FilmControlsView(this.#openedFilm.userDetails);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#popupComponent.setOnCloseButtonClick(() => {
      this.destroy();
    });

    render(new FilmDetailsView(this.#openedFilm), this.#popupComponent.topContainer);
    render(this.#controlsComponent, this.#popupComponent.topContainer);

    this.#controlsComponent.setOnAddToWatchlistClick(this.#handleAddToWatchlistClick);
    this.#controlsComponent.setOnAlreadyWatchedClick(this.#handleAlreadyWatchedClick);
    this.#controlsComponent.setOnFavoriteClick(this.#handleFavoriteClick);

    this.#comments.forEach((comment) => {
      render(new CommentView(comment), this.#popupComponent.commentContainer);
    });

    render(new NewCommentFormView(), this.#popupComponent.commentContainer);
    render(this.#popupComponent, document.body);
  };

  destroy = () => {
    if (document.body.contains(this.#popupComponent.element)) {
      remove(this.#popupComponent);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      document.body.classList.remove('hide-overflow');
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleAddToWatchlistClick = () => {
    const newUserDetails = { ...this.#openedFilm.userDetails, watchlist: !this.#openedFilm.userDetails.watchlist };
    this.#changeData({ ...this.#openedFilm, userDetails: newUserDetails });
  };

  #handleAlreadyWatchedClick = () => {
    const newUserDetails = { ...this.#openedFilm.userDetails, alreadyWatched: !this.#openedFilm.userDetails.alreadyWatched };
    this.#changeData({ ...this.#openedFilm, userDetails: newUserDetails });
  };

  #handleFavoriteClick = () => {
    const newUserDetails = { ...this.#openedFilm.userDetails, favorite: !this.#openedFilm.userDetails.favorite };
    this.#changeData({ ...this.#openedFilm, userDetails: newUserDetails });
  };
}
