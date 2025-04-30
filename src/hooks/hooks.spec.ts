import { act, renderHook } from '@testing-library/react';
import { Months } from '../types/calendar/enums';

import { useEvent } from './useDraftEvent';

describe('React hooks', () => {
  describe('useDate()', () => {
    const year = 2025;
    const month = Months.DECEMBER;
    const day = 1;

    describe('Only passing locale to constructor', () => {
      it('should return draft event initially as undefined', () => {
        const { result } = renderHook(() => useEvent(year, month, day));
        const { draftEvent } = result.current;
        expect(draftEvent).toBe(undefined);
      });
      it('should return updated draft event when creating event', () => {
        const { result, rerender } = renderHook(() =>
          useEvent(year, month, day),
        );
        const { createDraftEvent } = result.current;
        const relativeY = 49;

        act(() => {
          createDraftEvent(relativeY);
        });
        rerender();

        const { draftEvent: draftEventUpdated } = result.current;
        console.log(draftEventUpdated);
        expect(draftEventUpdated).toBeDefined();
        expect(draftEventUpdated?.id).toBeDefined();
        expect(draftEventUpdated?.title).toStrictEqual('(No title)');
        expect(draftEventUpdated?.start.block).toStrictEqual({
          fifteenMinBlock: 3,
          hour: 0,
          minutes: 45,
        });
        expect(draftEventUpdated?.end.block).toStrictEqual({
          fifteenMinBlock: 4,
          hour: 1,
          minutes: 0,
        });
        expect(draftEventUpdated?.start.fixedPositionY).toStrictEqual(37.5);
        expect(draftEventUpdated?.end.fixedPositionY).toStrictEqual(37.5);
        expect(draftEventUpdated?.start.date).toBeDefined();
        expect(draftEventUpdated?.end.date).toBeDefined();
      });
      it('should return updated draft event when updating event', () => {
        const { result, rerender } = renderHook(() =>
          useEvent(year, month, day),
        );
        const { createDraftEvent, updateDraftEvent } = result.current;
        const relativeYCreate = 0;
        const relativeYUpdate = 49;

        act(() => {
          createDraftEvent(relativeYCreate);
          updateDraftEvent(relativeYUpdate);
        });
        rerender();
        const { draftEvent: draftEventUpdated } = result.current;

        expect(draftEventUpdated).toBeDefined();
        expect(draftEventUpdated?.id).toBeDefined();
        expect(draftEventUpdated?.title).toStrictEqual('(No title)');
        expect(draftEventUpdated?.start.block).toStrictEqual({
          fifteenMinBlock: 0,
          hour: 0,
          minutes: 0,
        });
        expect(draftEventUpdated?.end.block).toStrictEqual({
          fifteenMinBlock: 4,
          hour: 1,
          minutes: 0,
        });
        expect(draftEventUpdated?.start.fixedPositionY).toStrictEqual(0);
        expect(draftEventUpdated?.end.fixedPositionY).toStrictEqual(50);
        expect(draftEventUpdated?.start.date).toBeDefined();
        expect(draftEventUpdated?.end.date).toBeDefined();
      });
      // it('should update and return the date', async () => {
      //   let currentDate = new Date();
      //   const { result } = renderHook(() => useEvent(year, month, day));
      //   const { date: initialDate, updateDate: initialUpdateDate } =
      //     result.current;
      //   const [initialDateWithoutMilliseconds, initialDateTimezone] =
      //     dateWithoutMilliseconds(initialDate);
      //   const [currentDateWithoutMilliseconds, currentDateTimezone] =
      //     dateWithoutMilliseconds(currentDate);
      //   expect(initialDateWithoutMilliseconds).toStrictEqual(
      //     currentDateWithoutMilliseconds,
      //   );
      //   expect(initialDateTimezone).toStrictEqual(currentDateTimezone);

      //   act(() => {
      //     initialUpdateDate(initialYear - 1, initialMonth - 1, initialDay);
      //   });

      //   const { date: updatedDate } = result.current;
      //   currentDate = new Date(initialYear - 1, initialMonth - 1, initialDay);
      //   await waitFor(() => {
      //     const [updatedDateWithoutMilliseconds, updatedDateTimezone] =
      //       dateWithoutMilliseconds(updatedDate);
      //     const [currentDateWithoutMilliseconds, currentDateTimezone] =
      //       dateWithoutMilliseconds(currentDate);
      //     expect(updatedDateWithoutMilliseconds).toStrictEqual(
      //       currentDateWithoutMilliseconds,
      //     );
      //     expect(updatedDateTimezone).toStrictEqual(currentDateTimezone);
      //   });
      // });
    });
    // describe.skip('Passing locale and initial date to constructor', () => {
    //   it('should return initial date with only locale param', () => {
    //     const currentDate = new Date(initialYear, initialMonth, initialDay);
    //     const { result } = renderHook(() => useDate(locale, currentDate));
    //     const {
    //       date: initialDate,
    //       day,
    //       dayOfWeek,
    //       month,
    //       monthNumberOfDays,
    //       timeInMilliseconds,
    //       year,
    //     } = result.current;
    //     const [initialDateWithoutMilliseconds, initialDateTimezone] =
    //       dateWithoutMilliseconds(initialDate);
    //     const [currentDateWithoutMilliseconds, currentDateTimezone] =
    //       dateWithoutMilliseconds(currentDate);
    //     expect(initialDateWithoutMilliseconds).toStrictEqual(
    //       currentDateWithoutMilliseconds,
    //     );
    //     expect(initialDateTimezone).toStrictEqual(currentDateTimezone);
    //     expect(year).toStrictEqual(getYear(currentDate));
    //     expect(month).toStrictEqual(getMonthIndex(locale, currentDate));
    //     expect(day).toStrictEqual(getDay(currentDate));
    //     expect(dayOfWeek).toStrictEqual(getDayOfWeek(locale, currentDate));
    //     expect(monthNumberOfDays).toStrictEqual(
    //       getMonthNumberOfDays(locale, currentDate),
    //     );
    //     expect(timeInMilliseconds.toString().length).toStrictEqual(
    //       getTimeInMilliseconds(currentDate).toString().length,
    //     );
    //     expect(getFirstThreeDigits(timeInMilliseconds)).toStrictEqual(
    //       getFirstThreeDigits(getTimeInMilliseconds(currentDate)), // precision of 5 digits
    //     );
    //   });
    //   it('should update and return the date', async () => {
    //     let currentDate = new Date(initialYear, initialMonth, initialDay);
    //     const { result } = renderHook(() => useDate(locale, currentDate));
    //     const { date: initialDate, updateDate: initialUpdateDate } =
    //       result.current;
    //     const [initialDateWithoutMilliseconds, initialDateTimezone] =
    //       dateWithoutMilliseconds(initialDate);
    //     const [currentDateWithoutMilliseconds, currentDateTimezone] =
    //       dateWithoutMilliseconds(currentDate);
    //     expect(initialDateWithoutMilliseconds).toStrictEqual(
    //       currentDateWithoutMilliseconds,
    //     );
    //     expect(initialDateTimezone).toStrictEqual(currentDateTimezone);

    //     act(() => {
    //       initialUpdateDate(initialYear - 1, initialMonth - 1, initialDay);
    //     });

    //     const { date: updatedDate } = result.current;
    //     currentDate = new Date(initialYear - 1, initialMonth - 1, initialDay);
    //     await waitFor(() => {
    //       const [updatedDateWithoutMilliseconds, updatedDateTimezone] =
    //         dateWithoutMilliseconds(updatedDate);
    //       const [currentDateWithoutMilliseconds, currentDateTimezone] =
    //         dateWithoutMilliseconds(currentDate);
    //       expect(updatedDateWithoutMilliseconds).toStrictEqual(
    //         currentDateWithoutMilliseconds,
    //       );
    //       expect(updatedDateTimezone).toStrictEqual(currentDateTimezone);
    //     });
    //   });
    // });
  });
});
