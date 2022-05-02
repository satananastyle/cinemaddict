import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonMoreView from '../view/button-more-view.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsList = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();

  init = (mainContainerElement) => {
    this.mainContainerElement = mainContainerElement;

    render(new SortView(), this.mainContainerElement);
    render(this.filmsComponent, this.mainContainerElement);
    render(this.filmsList, this.filmsComponent.getElement());
    render(this.filmsListContainer, this.filmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainer.getElement());
    }

    render(new ButtonMoreView(), this.filmsList.getElement());
  };
}
