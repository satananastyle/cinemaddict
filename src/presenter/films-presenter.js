import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render } from '../render.js';
import { FilmListTitle } from '../const.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListContainer = new FilmsListContainerView();
  filmsList = new FilmsListView(FilmListTitle.MAIN);

  init = (mainContainerElement, filmsModel) => {
    this.mainContainerElement = mainContainerElement;
    this.films = [...filmsModel.getFilms()];

    if (this.films.length > 0) {
      render(new SortView(), this.mainContainerElement);
      render(this.filmsListContainer, this.filmsList.getElement());

      for (let i = 0; i < this.films.length; i++) {
        render(new FilmCardView(this.films[i]), this.filmsListContainer.getElement());
      }

      render(new ShowMoreButtonView(), this.filmsList.getElement());
    }
    render(this.filmsComponent, this.mainContainerElement);
    render(this.filmsList, this.filmsComponent.getElement());
  };
}
