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

  #topContainerElement = null;
  #commentsWrapElement = null;
  #closeButtonElement = null;

  constructor(filmsModel) {
    this.#filmsModel = filmsModel;
  }

  init = (film) => {
    this.#openedFilm = film;
    this.#comments = this.#filmsModel.getComments(this.#openedFilm.comments.length);
    this.#popupComponent = new PopupView(this.#comments);

    render(this.#popupComponent, document.body);

    this.#topContainerElement = this.#popupComponent.topContainer;
    this.#commentsWrapElement = this.#popupComponent.commentContainer;
    this.#closeButtonElement = this.#popupComponent.closeButton;

    this.#closeButtonElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.delete();
    });

    render(new FilmDetailsView(this.#openedFilm), this.#topContainerElement);
    render(new FilmControlsView(this.#openedFilm.userDetails), this.#topContainerElement);

    for (let i = 0; i < this.#comments.length; i++) {
      render(new CommentView(this.#comments[i]), this.#commentsWrapElement);
    }

    render(new NewCommentFormView(), this.#commentsWrapElement);
  };

  delete = (remove) => {
    if (document.body.lastChild === this.#popupComponent.element) {
      document.body.removeChild(this.#popupComponent.element);
      document.removeEventListener('keydown', remove);
    }

    this.#topContainerElement = null;
    this.#commentsWrapElement = null;
    this.#closeButtonElement = null;
  };
}
