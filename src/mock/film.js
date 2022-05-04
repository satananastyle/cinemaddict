import { getRandomInteger, getRandom, getRandomInfo, getRandomList } from '../utils.js';

const MAX_AGE = 18;
const MAX_RATING = 10;

const Runtime = {
  MIN: 15,
  MAX: 200
};

const posters = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg'
];

const titles = [
  'Легенда о волках',
  'Песнь моря',
  'Реальные упыри',
  'Королевство полной луны',
  'Психо',
  'Идеальные незнакомцы',
  'Французский вестник. Приложение к газете «Либерти. Канзас ивнинг сан»'
];

const alternativeTitles = [
  'WolfWalkers',
  'Song of the Sea',
  'What We Do in the Shadows',
  'Moonrise Kingdom',
  'Psycho',
  'Perfetti sconosciuti',
  'The French Dispatch'
];

const countries = [
  'Irish',
  'Denmark',
  'New Zealand',
  'USA',
  'Italy',
  'Germany'
];

const directors = [
  'Tomm Moore',
  'Ross Stewart',
  'Taika Waititi',
  'Jemaine Clement',
  'Wes Anderson',
  'Alfred Hitchcock',
];

const writers = [
  'Will Collins',
  'Ross Stewart',
  'Taika Waititi',
  'Jemaine Clement',
  'Wes Anderson',
  'Joseph Stefano',
  'Robert Bloch'
];

const actors = [
  'Bruce Willis',
  'Edward Norton',
  'Bill Murray',
  'Frances McDormand',
  'Jared Gilman',
  'Tilda Swinton',
  'Taika Waititi'
];

const genres = [
  'Cartoon',
  'Comedy',
  'Horror',
  'Detective',
  'Thriller',
  'Family',
  'Drama'
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus'
];


export const generateFilm = () => ({
  id: '0',
  // 'comments': [

  // ],
  filmInfo: {
    title: getRandomInfo(titles),
    alternativeTitle: getRandomInfo(alternativeTitles),
    totalRating: getRandom(0, MAX_RATING),
    poster: getRandomInfo(posters),
    ageRating: getRandomInteger(0, MAX_AGE),
    director: getRandomInfo(directors),
    writers: getRandomList(writers),
    actors: getRandomList(actors),
    release: {
      releaseDate: '2019-05-11T00:00:00.000Z',
      releaseCountry: getRandomInfo(countries)
    },
    runtime: getRandomInteger(Runtime.MIN, Runtime.MAX),
    genre: getRandomList(genres),
    description: getRandomList(descriptions).join(' '),
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1))
  }
});
