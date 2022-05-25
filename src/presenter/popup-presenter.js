import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { render } from '../render.js';

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

    render(this.#popupComponent, document.body);

    this.#popupComponent.closeButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.delete();
    });

    render(new FilmDetailsView(this.#openedFilm), this.#popupComponent.topContainer);
    render(new FilmControlsView(this.#openedFilm.userDetails), this.#popupComponent.topContainer);

    this.#comments.forEach((comment) => {
      render(new CommentView(comment), this.#popupComponent.commentContainer);
    });

    render(new NewCommentFormView(), this.#popupComponent.commentContainer);
  };

  delete = (remove) => {
    if (document.body.lastChild === this.#popupComponent.element) {
      document.body.removeChild(this.#popupComponent.element);
      document.removeEventListener('keydown', remove);
      document.body.classList.remove('hide-overflow');
    }
  };
}
