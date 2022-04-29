import RatingView from './view/rating-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.header');

render(new RatingView(), siteHeaderElement);
