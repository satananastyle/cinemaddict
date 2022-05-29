import { generateFilm } from '../mock/film.js';
import { generateComment } from '../mock/comment.js';

export default class FilmsModel {
  #films = Array.from({ length: 16 }, generateFilm);

  get films() {
    return this.#films;
  }

  isEmpty() {
    return (this.#films.length === 0);
  }

  getComments = (comments) => Array.from({ length: comments }, generateComment);
}
