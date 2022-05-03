import { getRandomInteger } from '../utils.js';

const generateEmotions = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};

export const generateComment = () => ({
  'id': '42',
  'author': 'Ilya OReilly',
  'comment': 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': generateEmotions()
});
