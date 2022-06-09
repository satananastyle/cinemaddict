import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { render } from '../framework/render.js';

export default class PopupPresenter {
  #openedFilm = null;
  #comments = [];
  #popupComponent = null;
  #filmsModel = null;

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
  }

  init = (film) => {
    this.#openedFilm = film;
    this.#comments = this.#filmsModel.getComments(this.#openedFilm.comments.length);
    this.#popupComponent = new PopupView(this.#comments);

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscKeyDown);

    this.#popupComponent.setOnCloseButtonClick(() => {
      this.delete();
    });

    render(new FilmDetailsView(this.#openedFilm), this.#popupComponent.topContainer);
    render(new FilmControlsView(this.#openedFilm.userDetails), this.#popupComponent.topContainer);

    this.#comments.forEach((comment) => {
      render(new CommentView(comment), this.#popupComponent.commentContainer);
    });

    render(new NewCommentFormView(), this.#popupComponent.commentContainer);
    render(this.#popupComponent, document.body);
  };

  delete = () => {
    if (document.body.lastChild === this.#popupComponent.element) {
      document.body.removeChild(this.#popupComponent.element);
      document.removeEventListener('keydown', this.#onEscKeyDown);
      document.body.classList.remove('hide-overflow');
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.delete();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

}
