import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const formatRuntime = (minutes) => dayjs.duration(minutes, 'm').format('H[h] m[m]');

const formatDate = (date, format) => dayjs(date).format(format);

const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength)}…`
    : text;

export { formatRuntime, formatDate, truncateText };
