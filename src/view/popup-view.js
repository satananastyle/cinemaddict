import { createElement } from '../render.js';

const createPopupTemplate = (comments) => (
  `<section class="film-details">
     <form class="film-details__inner" action="" method="get">
       <div class="film-details__top-container">
         <div class="film-details__close">
           <button class="film-details__close-btn" type="button">close</button>
         </div>
       </div>
       <div class="film-details__bottom-container">
         <section class="film-details__comments-wrap">
           <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
           <ul class="film-details__comments-list"></ul>
         </section>
       </div>
     </form>
   </section>`
);

export default class PopupView {
  constructor(comments) {
    this.comments = comments;
  }

  getTemplate() {
    return createPopupTemplate(this.comments);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  getTopContainer() {
    return this.getElement().querySelector('.film-details__top-container');
  }

  getCommentContainer() {
    return this.getElement().querySelector('.film-details__comments-list');
  }

  removeElement() {
    this.element = null;
  }
}
