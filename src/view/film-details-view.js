import { createElement } from '../render.js';
import { formatDate, formatRuntime } from '../utils.js';

const RELEASE_DATE = 'DD MMMM YYYY';

const createRow = (title, info) => (
  `<tr class="film-details__row">
     <td class="film-details__term">${title}</td>
       <td class="film-details__cell">${info}</td>
   </tr>`
);

const createGenreTemplate = (genres) => genres
  .map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join('');

const createFilmDetailsTemplate = (film) => {
  const { filmInfo } = film;
  const info = {
    ageRating: filmInfo.ageRating,
    title: filmInfo.title,
    alternativeTitle: filmInfo.alternativeTitle,
    rating: filmInfo.totalRating,
    director: filmInfo.director,
    writers: filmInfo.writers.join(', '),
    actors: filmInfo.actors.join(', '),
    date: formatDate(filmInfo.release.date, RELEASE_DATE),
    runtime: formatRuntime(filmInfo.runtime),
    country: filmInfo.release.releaseCountry,
    genres: filmInfo.genres,
    poster: filmInfo.poster,
    description: filmInfo.description,
  };

  return (
    `<div class="film-details__info-wrap">
     <div class="film-details__poster">
       <img class="film-details__poster-img" src="${info.poster}" alt="">
       <p class="film-details__age">${info.ageRating}+</p>
     </div>
     <div class="film-details__info">
       <div class="film-details__info-head">
         <div class="film-details__title-wrap">
           <h3 class="film-details__title">${info.title}</h3>
           <p class="film-details__title-original">Original: ${info.alternativeTitle}</p>
         </div>
         <div class="film-details__rating">
           <p class="film-details__total-rating">${info.rating}</p>
         </div>
       </div>
       <table class="film-details__table">
         ${createRow('Director', info.director)}
         ${createRow('Writers', info.writers)}
         ${createRow('Actors', info.actors)}
         ${createRow('Release Date', info.date)}
         ${createRow('Runtime', info.runtime)}
         ${createRow('Country', info.country)}
         ${createRow((info.genres.length === 1 ? 'Genre' : 'Genres'), createGenreTemplate(info.genres))}
       </table>
       <p class="film-details__film-description">${info.description}</p>
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
