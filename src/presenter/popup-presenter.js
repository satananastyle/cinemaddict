import PopupView from '../view/popup-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { RenderPosition, render } from '../render.js';

export default class PopupPresenter {
  popupComponent = new PopupView();

  init = (mainContainerElement) => {
    this.mainContainerElement = mainContainerElement;

    render(this.popupComponent, this.mainContainerElement, RenderPosition.AFTEREND);

    const topContainerElement = document.querySelector('.film-details__top-container');
    const commentsWrapElement = document.querySelector('.film-details__comments-wrap');
    render(new FilmDetailsView(), topContainerElement);
    render(new FilmControlsView(), topContainerElement);

    for (let i = 0; i < 4; i++) {
      render(new CommentView(), commentsWrapElement);
    }

    render(new NewCommentFormView(), commentsWrapElement);
  };
}
