import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/utils.js';
import { DateFormat } from '../utils/const.js';

const createCommentTemplate = (message) => {
  const { comment, author, emotion, date } = message;

  return (
    `<li class="film-details__comment">
     <span class="film-details__comment-emoji">
       <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
     </span>
     <div>
       <p class="film-details__comment-text">${comment}</p>
       <p class="film-details__comment-info">
         <span class="film-details__comment-author">${author}</span>
         <span class="film-details__comment-day">${formatDate(date, DateFormat.COMMENT)}</span>
         <button class="film-details__comment-delete">Delete</button>
       </p>
     </div>
   </li>`
  );
};

export default class CommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createCommentTemplate(this.#comment);
  }
}
