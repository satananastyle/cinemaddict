import dayjs from 'dayjs';

const HOUR = 60;

const formatRuntime = (minutes) => {
  if (minutes >= HOUR) {
    return `${Math.floor(minutes / HOUR)}h ${minutes % HOUR}m`;
  }
  return `${minutes}m`;
};

const formatDate = (date, format) => dayjs(date).format(format);

const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength)}…`
    : text;

export { formatRuntime, formatDate, truncateText };
