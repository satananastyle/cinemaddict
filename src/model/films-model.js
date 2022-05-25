import { generateFilm } from '../mock/film.js';
import { generateComment } from '../mock/comment.js';

export default class FilmsModel {
  #films = Array.from({ length: 23 }, generateFilm);

  get films() {
    return this.#films;
  }

  getComments = (comments) => Array.from({ length: comments }, generateComment);
}
