import { useCallback, useRef, useEffect } from 'react';
import styles from './events-container.module.scss';
import { throttle } from 'throttle-debounce';
import { useSelector } from 'react-redux';
import { Event } from './Event/Event';
import { useDispatch } from 'react-redux';
import { EventModalsContainer } from '../EventModalsContainer/EventModalsContainer';
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
  cleareventOnUpdateMode,
  clearEventOnViewMode,
} from '../../../../redux/slices/eventSlice';
import { HourButtons } from './HourButtons/HourButtons';
import { isValidDraftEvent, isValidEvent } from '../../utils/eventValidation';
import { EventStored } from '../../../../types/event';

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
  const {
    draftEvent,
    createDraftEvent,
    updateDraftEvent,
    clearDraftEvent,
    createEvent,
  } = useEvent(year, month, day);

  const closeModals = useCallback(() => {
    dispatch(clearEventOnViewMode()); // view event details modal
    dispatch(cleareventOnUpdateMode()); // update event modal
  }, [dispatch]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      closeModals();

      const rect = containerRef.current.getBoundingClientRect();
      const relativeY = event.clientY - rect.top;
      createDraftEvent(relativeY);
    },
    [createDraftEvent, closeModals],
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

  return (
    <div
      ref={containerRef}
      className={styles.clickableHourOfTheDay}
      onMouseDown={handleMouseDown}
      onMouseMove={handleThrottledMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <EventModalsContainer />
      {draftEvent && isValidDraftEvent(draftEvent) && (
        <Event
          key={draftEvent.id}
          id={draftEvent.id}
          title={draftEvent.title}
          startY={draftEvent.start.fixedPositionY}
          endY={draftEvent.end.fixedPositionY}
          startDate={draftEvent.start.date}
          endDate={draftEvent.end.date}
        />
      )}
      {eventsOfSelectedDate
        .filter((event) => isValidEvent(event))
        .sort((a, b) => sortEventsByStartDate(a, b))
        .map((event) => (
          <Event
            id={event.id}
            key={event.id}
            title={event.title}
            startDate={event.startDate}
            endDate={event.endDate}
          />
        ))}
      <HourButtons />
    </div>
  );
};

const sortEventsByStartDate = (a: EventStored, b: EventStored) => {
  const startDateA = new Date(a.startDate);
  const startDateB = new Date(b.startDate);
  if (startDateA > startDateB) {
    return 1;
  }
  return -1;
};
