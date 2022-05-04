import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { RenderPosition, render } from '../render.js';

export default class PopupPresenter {
  popupComponent = new PopupView();

  init = (mainContainerElement, filmsModel) => {
    this.mainContainerElement = mainContainerElement;
    this.boardFilms = [...filmsModel.getFilms()];

    render(this.popupComponent, this.mainContainerElement, RenderPosition.AFTEREND);

    const topContainerElement = this.popupComponent.getTopContainer();
    const commentsWrapElement = this.popupComponent.getCommentContainer();
    render(new FilmDetailsView(this.boardFilms[0]), topContainerElement);
    render(new FilmControlsView(this.boardFilms[0]), topContainerElement);

    for (let i = 0; i < 4; i++) {
      render(new CommentView(), commentsWrapElement);
    }

    render(new NewCommentFormView(), commentsWrapElement);
  };
}
