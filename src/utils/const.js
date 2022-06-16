const FilmListTitle = {
  EMPTY: 'There are no movies in our database',
  MAIN: 'All movies. Upcoming',
  RATED: 'Top rated',
  COMMENTED: 'Most commented'
};

const DateFormat = {
  COMMENT: 'YYYY/MM/DD HH:MM',
  RELEASE: 'YYYY',
  RELEASE_FULL: 'DD MMMM YYYY',
};

const FilterType = {
  ALL: 'All movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',

  // ALL: {
  //   name: 'All movies',
  //   id: 'all'
  // },
  // WATCHLIST: {
  //   name: 'Watchlist',
  //   id: 'watchlist'
  // },
  // HISTORY: {
  //   name: 'History',
  //   id: 'history'
  // },
  // FAVORITES: {
  //   name: 'Favorites',
  //   id: 'favorites'
  // }
};

export { FilmListTitle, DateFormat, FilterType };
