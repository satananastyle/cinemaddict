import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { RenderPosition, render } from '../render.js';

export default class PopupPresenter {
  init = (mainContainerElement, filmsModel) => {
    this.mainContainerElement = mainContainerElement;
    this.openedFilm = [...filmsModel.getFilms()][0];
    this.commentsList = [...filmsModel.getComments(this.openedFilm.comments.length)];
    this.popupComponent = new PopupView(this.commentsList);

    render(this.popupComponent, this.mainContainerElement, RenderPosition.AFTEREND);

    const topContainerElement = this.popupComponent.getTopContainer();
    const commentsWrapElement = this.popupComponent.getCommentContainer();
    render(new FilmDetailsView(this.openedFilm), topContainerElement);
    render(new FilmControlsView(this.openedFilm), topContainerElement);

    for (let i = 0; i < this.commentsList.length; i++) {
      render(new CommentView(this.commentsList[i]), commentsWrapElement);
    }

    render(new NewCommentFormView(), commentsWrapElement);
  };
}
