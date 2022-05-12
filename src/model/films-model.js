import { generateFilm } from '../mock/film.js';
import { generateComment } from '../mock/comment.js';

export default class FilmsModel {
  films = Array.from({ length: 9 }, generateFilm);

  getFilms = () => this.films;

  getComments = (comments) => Array.from({ length: comments }, generateComment);
}
