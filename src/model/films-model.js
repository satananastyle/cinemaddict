import { generateFilm } from '../mock/film.js';
import { generateComment } from '../mock/comment.js';

export default class FilmsModel {
  #films = Array.from({ length: 24 }, generateFilm);

  get films() {
    return this.#films;
  }

  getComments = (comments) => Array.from({ length: comments }, generateComment);

  isEmpty() {
    return this.#films.length === 0;
  }
}
