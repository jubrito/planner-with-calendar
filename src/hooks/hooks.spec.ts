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

        const { draftEvent } = result.current;
        expect(draftEvent).toBeDefined();
        expect(draftEvent?.id).toBeDefined();
        expect(draftEvent?.title).toStrictEqual('(No title)');
        expect(draftEvent?.start.block).toStrictEqual({
          fifteenMinBlock: 3,
          hour: 0,
          minutes: 45,
        });
        expect(draftEvent?.end.block).toStrictEqual({
          fifteenMinBlock: 4,
          hour: 1,
          minutes: 0,
        });
        expect(draftEvent?.start.fixedPositionY).toStrictEqual(37.5);
        expect(draftEvent?.end.fixedPositionY).toStrictEqual(37.5);
        expect(draftEvent?.start.date).toBeDefined();
        expect(draftEvent?.end.date).toBeDefined();
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
        const { draftEvent } = result.current;

        expect(draftEvent).toBeDefined();
        expect(draftEvent?.id).toBeDefined();
        expect(draftEvent?.title).toStrictEqual('(No title)');
        expect(draftEvent?.start.block).toStrictEqual({
          fifteenMinBlock: 0,
          hour: 0,
          minutes: 0,
        });
        expect(draftEvent?.end.block).toStrictEqual({
          fifteenMinBlock: 4,
          hour: 1,
          minutes: 0,
        });
        expect(draftEvent?.start.fixedPositionY).toStrictEqual(0);
        expect(draftEvent?.end.fixedPositionY).toStrictEqual(50);
        expect(draftEvent?.start.date).toBeDefined();
        expect(draftEvent?.end.date).toBeDefined();
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
        const { draftEvent } = result.current;

        expect(draftEvent).toBeUndefined();
      });
    });
  });
});
