import { act, render, renderHook } from '@testing-library/react';
import { Months } from '../types/calendar/enums';

import { useEvent } from './useDraftEvent';
import { EventStored } from '../types/event';
import { defaultEventTitle } from '../utils/events/dayView/constants';
import { useFocusManager } from './useFocusManager';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef } from 'react';

describe('React hooks', () => {
  describe('useDraftEvent()', () => {
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
        expect(draftEvent?.title).toStrictEqual(defaultEventTitle);
        expect(draftEvent?.start.block).toStrictEqual({
          fifteenMinBlock: 3,
          hour: 0,
          minutes: 45,
        });
        expect(draftEvent?.end.block).toStrictEqual({
          fifteenMinBlock: 0,
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
        expect(draftEvent?.title).toStrictEqual(defaultEventTitle);
        expect(draftEvent?.start.block).toStrictEqual({
          fifteenMinBlock: 0,
          hour: 0,
          minutes: 0,
        });
        expect(draftEvent?.end.block).toStrictEqual({
          fifteenMinBlock: 0,
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

      it('should return new event when creating event', () => {
        const { result, rerender } = renderHook(() =>
          useEvent(year, month, day),
        );
        const { createDraftEvent, createEvent } = result.current;
        const relativeYCreate = 0;

        act(() => {
          createDraftEvent(relativeYCreate);
        });
        rerender();
        const { draftEvent } = result.current;
        const initialEvent: EventStored = {
          id: '',
          title: '',
          endDate: '',
          startDate: '',
        };
        let newEvent: EventStored = initialEvent;
        act(() => {
          expect(draftEvent).toBeDefined();
          if (draftEvent != null) {
            newEvent = createEvent(draftEvent);
          }
        });
        expect(newEvent.id).not.toStrictEqual(initialEvent.id);
        expect(newEvent.title).not.toStrictEqual(initialEvent.title);
        expect(newEvent.startDate).not.toStrictEqual(initialEvent.startDate);
        expect(newEvent.endDate).not.toStrictEqual(initialEvent.endDate);
      });
    });
  });
  describe('useFocusManager', () => {
    const ComponentWithFocusManager = () => {
      const initialActiveElementRef = useRef<HTMLButtonElement>(null);
      const { elementRef, returnFocusToInitialElement, setupFocusTrap } =
        useFocusManager<HTMLDivElement>(initialActiveElementRef.current);

      useEffect(() => {
        initialActiveElementRef?.current?.focus();
      }, []);

      return (
        <>
          <button ref={initialActiveElementRef}>Initial active element</button>
          <div ref={elementRef} role="dialog">
            <button onClick={() => setupFocusTrap()}>Set-up focus trap</button>
            <button onClick={() => returnFocusToInitialElement()}>
              Return focus to initial element
            </button>
            <p>Content</p>
          </div>
        </>
      );
    };

    beforeEach(() => {
      render(<ComponentWithFocusManager />);
    });

    it("should focus component's first element when setting up focus trapping", () => {
      const initialActiveElement = screen.getByText('Initial active element');
      const setUpFocusTrapButton = screen.getByRole('button', {
        name: 'Set-up focus trap',
      });
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea',
      );
      expect(initialActiveElement).toHaveFocus();

      userEvent.click(setUpFocusTrapButton);

      const [firstFocusableElement] = focusableElements;
      expect(firstFocusableElement).toHaveFocus();
    });
  });
});
