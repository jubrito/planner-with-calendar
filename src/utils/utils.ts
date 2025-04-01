import { ObjectType } from '../types/calendar/types';

export const isObject = (obj: unknown): obj is ObjectType => {
  if (typeof obj != 'object' || obj === null || obj == null) return false;

  // Ensure it is plain object, not subclass such ass Array and Date
  const prototype = Object.getPrototypeOf(obj);
  if (prototype !== Object.prototype) return false;

  for (const key in obj) {
    if (typeof key !== 'string') return false;
  }

  return true;
};

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
    const chunkIndex = Math.floor(index / chunkSize);

    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
