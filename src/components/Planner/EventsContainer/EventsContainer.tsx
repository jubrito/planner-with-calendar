import { useCallback, useRef, useEffect, RefObject } from 'react';
import styles from './events-container.module.scss';
import { throttle } from 'throttle-debounce';
import { useSelector } from 'react-redux';
import { Event } from './Event/Event';
import { useDispatch } from 'react-redux';
import {
  addEvent,
  clearSelectedDayViewEvent,
  updateSelectedDayViewEvent,
} from '../../../redux/slices/eventSlice';
import { EventOnCreate, EventStored } from '../../../types/event';
import {
  getCurrentEvents,
  getCurrentSelectedDayViewEvent,
} from '../../../redux/slices/eventSlice/selectors';
import { useEvent } from '../../../hooks/useDraftEvent';
import { HourButtons } from './HourButtons/HourButtons';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../redux/slices/dateSlice/selectors';
import { EventModalsContainer } from '../EventModalsContainer/EventModalsContainer';

export const EventContainer = () => {
  const events = useSelector(getCurrentEvents());
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const month = useSelector(getSelectedDayViewMonth(locale));
  const day = useSelector(getSelectedDayViewDay());
  const selectedDayViewEvent = useSelector(getCurrentSelectedDayViewEvent());

  const {
    draftEvent,
    createDraftEvent,
    updateDraftEvent,
    clearDraftEvent,
    createEvent,
  } = useEvent(year, month, day);

  useEffect(() => {
    console.log('events', events);
  }, [events]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      createDraftEvent(relativeY);
    },
    [createDraftEvent],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!draftEvent || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      updateDraftEvent(relativeY);
    },
    [draftEvent, updateDraftEvent],
  );

  const throttledMouseMoveRef = useRef(throttle(80, handleMouseMove));

  useEffect(() => {
    const throttledFn = throttle(80, handleMouseMove);
    throttledMouseMoveRef.current = throttledFn;
    return () => {
      throttledFn.cancel();
    };
  }, [handleMouseMove]);

  const handleThrottledMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    throttledMouseMoveRef.current(event);
  };

  const handleMouseUp = useCallback(() => {
    if (!draftEvent) return;

    const newEvent = createEvent(draftEvent);
    dispatch(addEvent(newEvent));
    clearDraftEvent();
  }, [draftEvent, dispatch, clearDraftEvent, createEvent]);

  const selectedEventRef: RefObject<HTMLDivElement | null> = useRef(null);
  const viewEventModalRef: RefObject<HTMLDivElement | null> = useRef(null);

  const viewEventDetails = useCallback(
    (event: EventStored, eventRef: RefObject<HTMLDivElement>) => {
      console.log('Event clicked:', event);
      const moveEventInPixels = 20;
      dispatch(
        updateSelectedDayViewEvent({
          top: event.dayViewPosition.endY - moveEventInPixels,
          event,
        }),
      );
      selectedEventRef.current = eventRef.current;
      viewEventModalRef.current?.focus();
    },
    [dispatch],
  );

  const handleMouseLeave = () => {
    clearDraftEvent();
  };

  const closeModal = useCallback(() => {
    const eventRef = selectedEventRef.current;
    if (eventRef != null) eventRef.focus();
    dispatch(clearSelectedDayViewEvent());
  }, [dispatch]);

  return (
    <div
      ref={containerRef}
      className={styles.clickableHourOfTheDay}
      onMouseDown={handleMouseDown}
      onMouseMove={handleThrottledMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {selectedDayViewEvent && selectedDayViewEvent.event && (
        <EventModalsContainer
          closeModal={closeModal}
          viewEventModalRef={viewEventModalRef}
        />
      )}
      {draftEvent && isValidDraftEvent(draftEvent) && (
        <Event
          key={draftEvent.id}
          id={draftEvent.id}
          title={draftEvent.title}
          startY={draftEvent.start.fixedPositionY}
          endY={draftEvent.end.fixedPositionY}
          startDate={draftEvent.start.date}
          endDate={draftEvent.end.date}
          viewEventDetails={viewEventDetails}
        />
      )}
      {events
        .filter((event) => isValidEvent(event))
        .map((event) => (
          <Event
            id={event.id}
            key={event.id}
            title={event.title}
            startY={event.dayViewPosition.startY}
            endY={event.dayViewPosition.endY}
            startDate={event.startDate}
            endDate={event.endDate}
            viewEventDetails={viewEventDetails}
          />
        ))}
      <HourButtons />
    </div>
  );
};

const isValidDraftEvent = (event: EventOnCreate) =>
  event.id != null &&
  event.title != null &&
  event.start != null &&
  event.start.fixedPositionY != null &&
  event.end != null &&
  event.end.fixedPositionY;

const isValidEvent = (event: EventStored) =>
  event.id != null &&
  event.title != null &&
  event.startDate != null &&
  event.dayViewPosition.startY != null &&
  event.endDate != null &&
  event.dayViewPosition.endY !== null;
