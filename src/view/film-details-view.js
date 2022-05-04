import { createElement } from '../render.js';
import { formatDate, formatRuntime } from '../utils.js';

const RELEASE_DATE = 'DD MMMM YYYY';

const createGenreTemplate = (genres) => {
  const elements = [];

  genres.forEach((genre) => elements.push(`<span class="film-details__genre">${genre}</span>`));

  return elements.join('');
};

const createFilmDetailsTemplate = (film) => {
  const { filmInfo } = film;
  return (
    `<div class="film-details__info-wrap">
     <div class="film-details__poster">
       <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">
       <p class="film-details__age">${filmInfo.ageRating}+</p>
     </div>
     <div class="film-details__info">
       <div class="film-details__info-head">
         <div class="film-details__title-wrap">
           <h3 class="film-details__title">${filmInfo.title}</h3>
           <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
         </div>
         <div class="film-details__rating">
           <p class="film-details__total-rating">${filmInfo.totalRating}</p>
         </div>
       </div>
       <table class="film-details__table">
         <tr class="film-details__row">
           <td class="film-details__term">Director</td>
           <td class="film-details__cell">${filmInfo.director}</td>
         </tr>
         <tr class="film-details__row">
           <td class="film-details__term">Writers</td>
           <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
         </tr>
         <tr class="film-details__row">
           <td class="film-details__term">Actors</td>
           <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
         </tr>
         <tr class="film-details__row">
           <td class="film-details__term">Release Date</td>
           <td class="film-details__cell">${formatDate(filmInfo.release.releaseDate, RELEASE_DATE)}</td>
         </tr>
         <tr class="film-details__row">
           <td class="film-details__term">Runtime</td>
           <td class="film-details__cell">${formatRuntime(filmInfo.runtime)}</td>
         </tr>
         <tr class="film-details__row">
           <td class="film-details__term">Country</td>
           <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
         </tr>
         <tr class="film-details__row">
           <td class="film-details__term">Genres</td>
           <td class="film-details__cell">
             ${createGenreTemplate(filmInfo.genre)}
           </td>
         </tr>
       </table>
       <p class="film-details__film-description">${filmInfo.description}</p>
     </div>
   </div>`
  );
};

export default class FilmDetailsView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
