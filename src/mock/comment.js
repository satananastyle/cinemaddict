import { getRandomInfo } from './random.js';

const emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

export const generateComment = () => ({
  id: 1,
  author: 'Ilya OReilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: new Date('2019-05-11T16:12:32.554Z'),
  emotion: getRandomInfo(emotions)
});
