import { filter } from '../utils/utils.js';

export const generateFilter = (tasks) => Object.entries(filter).map(
  ([filterName, filterTasks]) => ({
    name: filterName,
    count: filterTasks(tasks).length,
  }),
);
