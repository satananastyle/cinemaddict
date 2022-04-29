import PopapView from '../view/popap-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import FilmControlsView from '../view/film-controls-view.js';
import CommentView from '../view/comment-view.js';
import NewCommentFormView from '../view/new-comment-form-view.js';
import { render } from '../render.js';

export default class PopapPresenter {
  popapComponent = new PopapView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(this.popapComponent, this.mainContainer);

    const topContainer = this.mainContainer.querySelector('.film-details__top-container');
    const commentsWrap = this.mainContainer.querySelector('.film-details__comments-wrap');
    render(new FilmDetailsView(), topContainer);
    render(new FilmControlsView(), topContainer);

    for (let i = 0; i < 4; i++) {
      render(new CommentView(), commentsWrap);
    }

    render(new NewCommentFormView(), commentsWrap);
  };
}
