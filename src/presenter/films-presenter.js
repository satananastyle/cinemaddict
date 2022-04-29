import SortView from '../view/sort-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import BtnMoreView from '../view/btn-more-view.js';
import { render } from '../render.js';

export default class FilmsListPresenter {
  filmsComponent = new FilmsView();
  filmsList = new FilmsListView();
  filmsListContainer = new FilmsListContainerView();

  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(new SortView(), this.mainContainer);
    render(this.filmsComponent, this.mainContainer);
    render(this.filmsList, this.filmsComponent.getElement());
    render(this.filmsListContainer, this.filmsList.getElement());

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainer.getElement());
    }

    render(new BtnMoreView(), this.filmsList.getElement());
  };
}
