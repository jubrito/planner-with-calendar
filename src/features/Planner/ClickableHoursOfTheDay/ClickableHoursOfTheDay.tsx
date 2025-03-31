import { useCallback, useEffect, useState } from 'react';
import { EventBlock } from '../../../types/calendar/types';
import styles from './clickable-hours-of-the-day.module.scss';
import { getBlockByVerticalPosition } from '../../../utils/calendar/utils';

export const ClickableHoursOfTheDay = () => {
  const [draftEvent, setDraftEvent] = useState<EventBlock | undefined>();
  useEffect(() => {
    const container = document.getElementById('clickableHourOfTheDay');
    if (!container) return;
    if (draftEvent && draftEvent.eventId) {
      const eventId = draftEvent.eventId;
      let draftEventElement = document.getElementById(eventId);
      const top = draftEvent.start.positionY - container.scrollTop;
      const height = draftEvent.end.positionY - top;
      if (!draftEventElement) {
        draftEventElement = document.createElement('div');
        draftEventElement.id = eventId;
        draftEventElement.classList.add(styles.plannerEvent);
        draftEventElement.style.top = `${top}px`;
        draftEventElement.style.height = `${height}px`;
        container.appendChild(draftEventElement);
      }
      draftEventElement.style.top = `${top}px`;
      draftEventElement.style.height = `${height}px`;
    }
  }, [draftEvent]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeY = event.clientY - rect.top;
    const buttonHeight = event.currentTarget.clientHeight;
    const block = getBlockByVerticalPosition(buttonHeight, relativeY);
    setDraftEvent({
      eventId: `draft-${new Date().getTime()}`,
      start: {
        positionY: relativeY,
        block,
      },
      end: {
        positionY: relativeY,
        block,
      },
    });
  };
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!draftEvent) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeY = event.clientY - rect.top;
    const buttonHeight = event.currentTarget.clientHeight;
    const block = getBlockByVerticalPosition(buttonHeight, relativeY);
    setDraftEvent((prevState) => {
      if (!prevState) return undefined;
      return {
        ...prevState,
        end: {
          ...prevState?.end,
          positionY: relativeY,
          block,
        },
      };
    });
  };

  const createEvent = (newEvent?: EventBlock) => {
    console.log('newEvent', newEvent);
  };

  const handleMouseUp = useCallback(() => {
    if (!draftEvent) return;
    createEvent(draftEvent);
    setDraftEvent(undefined);
  }, [draftEvent]); // add create event ?

  return (
    <div
      className={styles.clickableHourOfTheDay}
      id="clickableHourOfTheDay"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseMove={(event) => handleMouseMove(event)}
      onMouseUp={handleMouseUp}
    />
  );
};
