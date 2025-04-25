import { useState, useCallback, useRef, useEffect, memo } from 'react';
import styles from './clickable-hours-of-the-day.module.scss';
import { throttle } from 'throttle-debounce';
import { useSelector } from 'react-redux';
import {
  getSelectedGlobalDay,
  getSelectedGlobalMonth,
  getSelectedGlobalYear,
} from '../../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { Event } from './Event/Event';
import { HourButtons } from './HourButtons/HourButtons';
import { EventDetailsModal } from './EventDetailsModal/EventDetailsModal';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../../redux/slices/eventSlice';
import { Event as EventType } from '../../../types/event';
import { getCurrentEvents } from '../../../redux/slices/eventSlice/selectors';
import { getMinimumEventFixedPositionY } from './getPositionsY';
import { useEvent } from '../../../hooks/useDraftEvent';

export type Block = {
  hour: number;
  minutes: number;
  fifteenMinBlock: number;
};

export type TimeBlock = {
  fixedPositionY: number;
  block: Block;
  date: Date;
};

export type EventBlock = {
  eventId: string;
  start: TimeBlock;
  end: TimeBlock;
  title: string;
};

export type EventOnEdit = {
  title: EventBlock['title'];
  startDate: EventBlock['start']['date'];
  endDate: EventBlock['end']['date'];
  endY: EventBlock['end']['fixedPositionY'];
};

type EventOnEditModalDetails = {
  isOpen: boolean;
  top: number;
  eventOnEdit?: EventOnEdit;
};

export const ClickableHoursOfTheDay = memo(() => {
  const [eventClickedDetails, setEventClickedDetails] =
    useState<EventOnEditModalDetails>({
      isOpen: false,
      top: 0,
      eventOnEdit: undefined,
    });
  const events = useSelector(getCurrentEvents());
  const containerRef = useRef<HTMLDivElement>(null);
  const localeString = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(localeString));
  const day = useSelector(getSelectedGlobalDay());
  const dispatch = useDispatch();
  const { draftEvent, createDraftEvent, updateDraftEvent, clearDraftEvent } =
    useEvent();

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

    const endMinimumFixedPosition = getMinimumEventFixedPositionY(
      draftEvent.start.fixedPositionY,
      draftEvent.end.fixedPositionY,
    );

    const event: EventType = {
      id: draftEvent.eventId.replace('draft', 'event'),
      title: draftEvent.title,
      startDate: new Date(
        year,
        month,
        day,
        draftEvent.start.block.hour,
        draftEvent.start.block.minutes,
      ),
      endDate: new Date(
        year,
        month,
        day,
        draftEvent.end.block.hour,
        draftEvent.end.block.minutes,
      ),
      dayViewPosition: {
        startY: draftEvent.start.fixedPositionY,
        endY: endMinimumFixedPosition,
      },
    };
    dispatch(addEvent(event));
    clearDraftEvent();
  }, [draftEvent, year, month, day, dispatch, clearDraftEvent]);

  const handleMouseLeave = useCallback(() => {
    clearDraftEvent();
  }, [clearDraftEvent]);

  const toggleEventDetailsModal = useCallback((eventOnEdit?: EventOnEdit) => {
    const moveEventInPixels = 20;
    setEventClickedDetails((prevState) => {
      let eventClickedDetails = {
        ...prevState,
        isOpen: false,
      };
      if (eventOnEdit) {
        eventClickedDetails = {
          ...eventClickedDetails,
          top: eventOnEdit.endY - moveEventInPixels,
          isOpen: true,
          eventOnEdit: {
            title: eventOnEdit.title,
            endDate: eventOnEdit.endDate,
            startDate: eventOnEdit.startDate,
            endY: eventOnEdit.endY,
          },
        };
      }
      return eventClickedDetails;
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.clickableHourOfTheDay}
      onMouseDown={handleMouseDown}
      onMouseMove={handleThrottledMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {eventClickedDetails.isOpen && eventClickedDetails.eventOnEdit && (
        <EventDetailsModal
          top={eventClickedDetails.top}
          title={eventClickedDetails.eventOnEdit.title}
          startDate={eventClickedDetails.eventOnEdit.startDate}
          endDate={eventClickedDetails.eventOnEdit.endDate}
          toggleDetailsModal={toggleEventDetailsModal}
        />
      )}
      {draftEvent && isValidDraftEvent(draftEvent) && (
        <Event
          key={draftEvent.eventId}
          id={draftEvent.eventId}
          title={draftEvent.title}
          startY={draftEvent.start.fixedPositionY}
          endY={draftEvent.end.fixedPositionY}
          startDate={draftEvent.start.date}
          endDate={draftEvent.end.date}
          toggleDetailsModal={toggleEventDetailsModal}
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
            toggleDetailsModal={toggleEventDetailsModal}
          />
        ))}
      <HourButtons />
    </div>
  );
});

const isValidDraftEvent = (event: EventBlock) =>
  event.eventId != null &&
  event.title != null &&
  event.start != null &&
  event.start.fixedPositionY != null &&
  event.end != null &&
  event.end.fixedPositionY;

const isValidEvent = (event: EventType) =>
  event.id != null &&
  event.title != null &&
  event.startDate != null &&
  event.dayViewPosition.startY != null &&
  event.endDate != null &&
  event.dayViewPosition.endY !== null;
