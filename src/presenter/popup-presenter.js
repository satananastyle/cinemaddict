import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { render } from '../render.js';

export default class PopupPresenter {
  init = (filmsModel) => {
    this.openedFilm = [...filmsModel.getFilms()][0];
    this.comments = [...filmsModel.getComments(this.openedFilm.comments.length)];
    this.popupComponent = new PopupView(this.comments);

    render(this.popupComponent, document.body);

    const topContainerElement = this.popupComponent.getTopContainer();
    const commentsWrapElement = this.popupComponent.getCommentContainer();
    render(new FilmDetailsView(this.openedFilm), topContainerElement);
    render(new FilmControlsView(this.openedFilm.userDetails), topContainerElement);

    for (let i = 0; i < this.comments.length; i++) {
      render(new CommentView(this.comments[i]), commentsWrapElement);
    }

    render(new NewCommentFormView(), commentsWrapElement);
  };
}
