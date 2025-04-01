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

export const chunkArrayWithNElements = <T>(
  array: T[],
  numberOfElements: number,
) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += numberOfElements) {
    chunks.push(array.slice(i, i + numberOfElements));
  }

  // const onlyFiveRows = chunks.length - 1 === 4;
  // const setFixedCalendarHeight = (chunks: CalendarCellInfo[][]) => {
  //   if (onlyFiveRows) {
  //     const lastRow = chunks[chunks.length - 1];
  //     const lastCellInfo = lastRow[lastRow.length - 1];
  //     const updatedLastCellInfo: CalendarCellInfo =
  //       lastCellInfo.month === month + 1
  //         ? {
  //             year,
  //             month: lastCellInfo.month + 1,
  //             day: firstDayOfTheMonth - 1,
  //           }
  //         : lastCellInfo;
  //     const nextEntireNextMonthDaysOnCurrentMonth =
  //       getEntireNextMonthDaysLastRowOnCurrentMonth(updatedLastCellInfo);
  //     chunks.push(nextEntireNextMonthDaysOnCurrentMonth);
  //   }
  // };
  // setFixedCalendarHeight(chunks);
  return chunks;
};
