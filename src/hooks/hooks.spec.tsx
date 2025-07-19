import { act, render, renderHook } from '@testing-library/react';
import { Months } from '../types/calendar/enums';
import { useEvent } from './useDraftEvent';
import { EventOnUpdate, EventStored } from '../types/event';
import { defaultEventTitle } from '../utils/events/dayView/constants';
import { useFocusManager } from './useFocusManager';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef } from 'react';
import { useManageEventUpdates } from './useManageEventUpdates';

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

    it('should return focus to initial element', () => {
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

      const returnFocusToInitialElementButton = screen.getByRole('button', {
        name: 'Set-up focus trap',
      });
      userEvent.click(returnFocusToInitialElementButton);

      expect(initialActiveElement).toHaveFocus();
    });
    it('should return elementRef, setupFocusTrap, and returnFocusToInitialElement', () => {
      const { result } = renderHook(() => useFocusManager<HTMLElement>(null));
      const { elementRef, returnFocusToInitialElement, setupFocusTrap } =
        result.current;
      expect(elementRef).toBeDefined();
      expect(returnFocusToInitialElement).toBeDefined();
      expect(setupFocusTrap).toBeDefined();
    });
  });

  describe('useManageEventUpdates', () => {
    const initialEvent: EventOnUpdate = {
      id: 'id',
      title: 'title',
      startDate: new Date(),
      endDate: new Date(),
      location: 'location',
      description: 'description',
    };
    const invalidEvent: EventOnUpdate = {
      ...initialEvent,
      startDate: new Date(0 / 0),
      endDate: new Date(0 / 0),
    };

    describe('Initial setup', () => {
      it('should set errors when setting fields with initial events', () => {
        const { result } = renderHook(() =>
          useManageEventUpdates(invalidEvent),
        );
        const { errors } = result.current;
        expect(errors).toStrictEqual({
          startDate: 'Start date must be a valid date',
          endDate: 'End date must be a valid date',
        });
      });
      it('should set is dirty to false', () => {
        const { result } = renderHook(() =>
          useManageEventUpdates(invalidEvent),
        );
        const { isDirty } = result.current;
        expect(isDirty).toBe(false);
      });
      it('should return event fields from initial event', () => {
        const { result } = renderHook(() =>
          useManageEventUpdates(initialEvent),
        );
        expect(result.current.eventFields).toStrictEqual(initialEvent);
      });
    });

    describe('WHEN updating fields', () => {
      it('should return updated event fields', () => {
        const newEvent: EventOnUpdate = {
          id: 'new id',
          title: 'new title',
          startDate: new Date(2011),
          endDate: new Date(2012),
          location: 'new location',
          description: 'new description',
        };
        const { result } = renderHook(() =>
          useManageEventUpdates(initialEvent),
        );
        act(() => {
          result.current.updateEventField('id', newEvent.id);
          result.current.updateEventField('title', newEvent.title);
          result.current.updateEventField('startDate', newEvent.startDate);
          result.current.updateEventField('endDate', newEvent.endDate);
          result.current.updateEventField('location', newEvent.location);
          result.current.updateEventField('description', newEvent.description);
        });
        expect(result.current.eventFields).toStrictEqual(newEvent);
      });
      it('should set is dirty to true', () => {
        const { result } = renderHook(() =>
          useManageEventUpdates(initialEvent),
        );
        expect(result.current.isDirty).toStrictEqual(false);
        act(() => {
          result.current.updateEventField('id', 'new id');
        });
        expect(result.current.isDirty).toBeTruthy();
      });
      it('should clear the errors of the field being updated', () => {
        const { result, rerender } = renderHook(() =>
          useManageEventUpdates({
            ...initialEvent,
            endDate: new Date(0 / 0), // invalid date
          }),
        );
        const { updateEventField } = result.current;
        rerender();
        expect(result.current.errors).toStrictEqual({
          endDate: 'End date must be a valid date',
        });
        act(() => {
          updateEventField('endDate', new Date()); // updating field with valid date
        });
        expect(result.current.errors).toStrictEqual({});
      });
    });

    describe('WHEN validating fields', () => {
      it('should update errors with validation errors and return true if they exist', () => {
        const { result, rerender } = renderHook(() =>
          useManageEventUpdates({
            ...initialEvent,
            startDate: new Date(2000),
            endDate: new Date(1000),
          }),
        );
        rerender();
        expect(result.current.errors).toStrictEqual({
          endDate: 'End date must be after start date',
        });
        const { validateEventFields } = result.current;

        act(() => {
          validateEventFields(); // updating field with valid date
        });
        expect(result.current.errors).toStrictEqual({
          endDate: 'End date must be after start date',
        });
        expect(result.current.validateEventFields).toBeTruthy();
      });
      it.todo('should return true if errors were found');
      it.todo('should return false if errors were not found');
    });

    it.todo('should update isDirty from false to true after updating an event');
  });
});
