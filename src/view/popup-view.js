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
  #element = null;
  #comments = null;

  constructor(comments) {
    this.#comments = comments;
  }

  get template() {
    return createPopupTemplate(this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get topContainer() {
    return this.element.querySelector('.film-details__top-container');
  }

  get commentContainer() {
    return this.element.querySelector('.film-details__comments-list');
  }

  get closeButton() {
    return this.element.querySelector('.film-details__close-btn');
  }

  removeElement() {
    this.#element = null;
  }
}
