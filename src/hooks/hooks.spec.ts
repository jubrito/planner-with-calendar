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
      it('should return updated draft event when creating draft event', () => {
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
      it('should return updated draft event when updating draft event', () => {
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
      it('should return cleaned draft event when clearing draft event', () => {
        const { result, rerender } = renderHook(() =>
          useEvent(year, month, day),
        );
        const { createDraftEvent, clearDraftEvent } = result.current;
        const relativeYCreate = 0;

        act(() => {
          createDraftEvent(relativeYCreate);
          clearDraftEvent();
        });
        rerender();
        const { draftEvent: draftEventUpdated } = result.current;

        expect(draftEventUpdated).toBeUndefined();
      });
    });
  });
});
