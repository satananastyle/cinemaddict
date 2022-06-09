import AbstractView from '../framework/view/abstract-view.js';
import { FilmListTitle } from '../const.js';

const createFilmsListTemplate = (title) => (
  `<section class="films-list">
      <h2 class="films-list__title ${title === FilmListTitle.MAIN ? 'visually-hidden' : ''}">
        ${title}
      </h2>
   </section>`
);

export default class FilmsListView extends AbstractView {
  #title = null;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createFilmsListTemplate(this.#title);
  }
}
