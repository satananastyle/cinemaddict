import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import { FilmsListView, MESSAGES } from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();

  filmsListContainer = new FilmsListContainerView();

  init = (mainContainerElement, filmsModel) => {
    this.mainContainerElement = mainContainerElement;
    this.boardFilms = [...filmsModel.getFilms()];
    this.filmsList = new FilmsListView(MESSAGES.main);

    if (this.boardFilms.length > 0) {
      render(new SortView(), this.mainContainerElement);
      render(this.filmsListContainer, this.filmsList.getElement());

      for (let i = 0; i < this.boardFilms.length; i++) {
        render(new FilmCardView(this.boardFilms[i]), this.filmsListContainer.getElement());
      }

      render(new ShowMoreButtonView(), this.filmsList.getElement());
    }
    render(this.filmsComponent, this.mainContainerElement);
    render(this.filmsList, this.filmsComponent.getElement());
  };
}
