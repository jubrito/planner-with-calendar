import { DateConfig } from '../types/calendar/types';
import { ObjectType } from '../types/types';
import { isObject } from './checkers';

export const deepCopy = <T extends ObjectType>(element: T): T => {
  const copy = {} as T;
  for (const prop in element) {
    const value = element[prop];
    if (isObject(value)) {
      copy[prop] = deepCopy(value);
    } else {
      copy[prop] = value;
    }
  }
  return copy;
};

/**
 * Function to chunk array with chunks with n (chunkSize) elements
 * @param array
 * @param chunkSize the number of elements a chunk will have
 * @returns chunks matrix with array elements in chunks with chunkSize length
 */
export const getChunkArrayByChunkSize = <T>(
  array: T[],
  chunkSize: number,
): T[][] =>
  array.reduce((chunks: T[][], item, index) => {
    /**
     * Rounds up to get chunk index
     * index(0 to 4) / chunkSize(5) rounds down to 0, item should be added to first chunk since it's 0 indexed
     * index(5 to 9) / chunkSize(5) rounds down to 1, item should be added to second chunk
     */
    if (chunkSize <= 0) return [array];
    const chunkIndex = Math.floor(index / Math.floor(chunkSize));
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);

export const makeFirstLetterUppercase = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1, name.length);

export const isSameDayEvent = (
  startEvent: {
    year: DateConfig['year'];
    month: DateConfig['month'];
    day: DateConfig['day'];
  },
  endEvent: {
    year: DateConfig['year'];
    month: DateConfig['month'];
    day: DateConfig['day'];
  },
) =>
  startEvent.day === endEvent.day &&
  startEvent.month === endEvent.month &&
  startEvent.year === endEvent.year;
