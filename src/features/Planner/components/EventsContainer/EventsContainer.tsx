import { useCallback, useRef, useEffect, RefObject, useMemo } from 'react';
import styles from './events-container.module.scss';
import { throttle } from 'throttle-debounce';
import { useSelector } from 'react-redux';
import { Event } from './Event/Event';
import { useDispatch } from 'react-redux';
import {
  EventModalsContainer,
  ViewEventDetailsModalProps,
} from '../EventModalsContainer/EventModalsContainer';
import { getCurrentEventsOfSelectedDate } from '../../../../redux/slices/eventSlice/selectors';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDayViewDay,
  getSelectedDayViewISODate,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../../redux/slices/dateSlice/selectors';
import { useEvent } from '../../../../hooks/useDraftEvent';
import {
  addEvent,
  clearEventOnViewMode,
  updateEventOnViewMode,
} from '../../../../redux/slices/eventSlice';
import { EventOnOpenDetails } from '../../../../types/event';
import { HourButtons } from './HourButtons/HourButtons';
import { isValidDraftEvent, isValidEvent } from '../../utils/eventValidation';

export const EventContainer = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const month = useSelector(getSelectedDayViewMonth(locale));
  const day = useSelector(getSelectedDayViewDay());
  const date = useSelector(getSelectedDayViewISODate());
  const eventsOfSelectedDate = useSelector(
    getCurrentEventsOfSelectedDate(date),
  );
  const viewEventModalRef: RefObject<HTMLDivElement | null> = useRef(null);
  // const createEventModalRef: RefObject<HTMLDivElement | null> = useRef(null);
  const selectedEventRef: RefObject<HTMLDivElement | null> = useRef(null);

  const {
    draftEvent,
    createDraftEvent,
    updateDraftEvent,
    clearDraftEvent,
    createEvent,
  } = useEvent(year, month, day);

  const viewEventModalInfo: ViewEventDetailsModalProps = useMemo(
    () => ({
      modalRef: viewEventModalRef,
      selectedEventRef: selectedEventRef,
    }),
    [],
  );

  // const createEventModalInfo: CreateEventModalProps = useMemo(
  //   () => ({
  //     modalRef: createEventModalRef,
  //   }),
  //   [],
  // );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      dispatch(clearEventOnViewMode()); // close view event details modal
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      createDraftEvent(relativeY);
    },
    [createDraftEvent, dispatch],
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
    dispatch(addEvent({ newEvent, ISODate: date }));
    clearDraftEvent();
  }, [draftEvent, dispatch, clearDraftEvent, createEvent, date]);

  const handleMouseLeave = () => {
    clearDraftEvent();
  };

  const viewEventDetails = useCallback(
    (event: EventOnOpenDetails, eventRef: RefObject<HTMLDivElement | null>) => {
      console.log('Event clicked:', event);
      const moveEventInPixels = 20;
      dispatch(
        updateEventOnViewMode({
          top: event.endY - moveEventInPixels,
          event,
        }),
      );
      selectedEventRef.current = eventRef.current;
      viewEventModalRef.current?.focus();
    },
    [dispatch],
  );

  return (
    <div
      ref={containerRef}
      className={styles.clickableHourOfTheDay}
      onMouseDown={handleMouseDown}
      onMouseMove={handleThrottledMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <EventModalsContainer viewEvent={viewEventModalInfo} />
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
      {eventsOfSelectedDate
        .filter((event) => isValidEvent(event))
        .map((event) => (
          <Event
            id={event.id}
            key={event.id}
            title={event.title}
            startDate={event.startDate}
            endDate={event.endDate}
            viewEventDetails={viewEventDetails}
          />
        ))}
      <HourButtons />
    </div>
  );
};

// const isValidDraftEvent = (event: EventOnCreate) =>
//   event.id != null &&
//   event.title != null &&
//   event.start != null &&
//   event.start.fixedPositionY != null &&
//   event.end != null &&
//   event.end.fixedPositionY;

// const isValidEvent = (event: EventStored) =>
//   event.id != null &&
//   event.title != null &&
//   event.startDate != null &&
//   event.endDate != null;
