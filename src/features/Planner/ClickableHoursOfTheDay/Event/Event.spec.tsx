import { Months } from '../../../../types/calendar/enums';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { EventBlock } from '../ClickableHoursOfTheDay';
import { Event } from './Event';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { initialValue } from '../../../../redux/slices/localeSlice';

describe('Event', () => {
  const year = 2025;
  const month = Months.APRIL;
  const day = 11;
  const startHour = 0;
  const startMinutes = 0;
  const endHour = 1;
  const endMinutes = 0;
  const event: EventBlock = {
    eventId: 'id',
    title: 'title',
    start: {
      positionY: 4,
      fixedPositionY: 0,
      date: new Date(year, month, day, startHour, startMinutes),
      block: {
        fifteenMinBlock: 0,
        hour: startHour,
        minutes: startMinutes,
      },
    },
    end: {
      positionY: 43,
      fixedPositionY: 50,
      date: new Date(year, month, day, endHour, endMinutes),
      block: {
        fifteenMinBlock: 4,
        hour: endHour,
        minutes: endMinutes,
      },
    },
  };
  it('should render event title', () => {
    renderWithProviders(<Event event={event} />);
    expect(screen.getByText(event.title)).toBeInTheDocument();
  });
  it('should render title explaining event is editable', () => {
    renderWithProviders(<Event event={event} />);
    expect(
      screen.getByTitle('Click on the event to edit it'),
    ).toBeInTheDocument();
  });
  describe('Hours display when using 12-hour clock system', () => {
    it('should display event with only one AM/PM if the event start and end is within the same period', () => {
      renderWithProviders(
        <Event
          event={event}
          id={event.eventId}
          title={event.title}
          startY={event.start.fixedPositionY}
          endY={event.end.fixedPositionY}
          startDate={event.start.date}
          endDate={event.end.date}
        />,
      );
      const eventTimeRange = screen.getByLabelText(
        `Time range from 12:00 to 01:00 AM`,
      );
      expect(eventTimeRange).toBeInTheDocument();
      expect(eventTimeRange).toHaveTextContent('12:00 – 01:00 AM');
    });
    it('should display event with both AM and PM if event start and end is not within the same period', () => {
      const startHour = 11;
      const startMinutes = 0;
      const endHour = 12;
      const endMinutes = 15;
      const event: EventBlock = {
        eventId: 'id',
        title: 'title',
        start: {
          positionY: 4,
          fixedPositionY: 0,
          date: new Date(year, month, day, startHour, startMinutes),
          block: {
            fifteenMinBlock: 0,
            hour: startHour,
            minutes: startMinutes,
          },
        },
        end: {
          positionY: 43,
          fixedPositionY: 50,
          date: new Date(year, month, day, endHour, endMinutes),
          block: {
            fifteenMinBlock: 4,
            hour: endHour,
            minutes: endMinutes,
          },
        },
      };
      renderWithProviders(<Event event={event} />);
      const eventTimeRange = screen.getByLabelText(
        `Time range from 11:00 AM to 12:15 PM`,
      );
      expect(eventTimeRange).toBeInTheDocument();
      expect(eventTimeRange).toHaveTextContent('11:00 AM – 12:15 PM');
    });
  });
  describe('Hours display when using 24-hour clock system', () => {
    const ptBrLang = 'pt-BR';
    it('should display time correctly when event start and end is within the same period', () => {
      renderWithProviders(<Event event={event} />, {
        preloadedState: {
          localeSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              locale: {
                lang: ptBrLang,
              },
            },
          },
        },
      });
      const eventTimeRange = screen.getByLabelText(
        `Time range from 00:00 to 01:00`,
      );
      expect(eventTimeRange).toBeInTheDocument();
      expect(eventTimeRange).toHaveTextContent('00:00 – 01:00');
    });
    it('should display time correctly if event start and end is not within the same period', () => {
      const startHour = 11;
      const startMinutes = 0;
      const endHour = 12;
      const endMinutes = 15;
      const event: EventBlock = {
        eventId: 'id',
        title: 'title',
        start: {
          positionY: 4,
          fixedPositionY: 0,
          date: new Date(year, month, day, startHour, startMinutes),
          block: {
            fifteenMinBlock: 0,
            hour: startHour,
            minutes: startMinutes,
          },
        },
        end: {
          positionY: 43,
          fixedPositionY: 50,
          date: new Date(year, month, day, endHour, endMinutes),
          block: {
            fifteenMinBlock: 4,
            hour: endHour,
            minutes: endMinutes,
          },
        },
      };
      renderWithProviders(<Event event={event} />, {
        preloadedState: {
          localeSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              locale: {
                lang: ptBrLang,
              },
            },
          },
        },
      });
      const eventTimeRange = screen.getByLabelText(
        `Time range from 11:00 to 12:15`,
      );
      expect(eventTimeRange).toBeInTheDocument();
      expect(eventTimeRange).toHaveTextContent('11:00 – 12:15');
    });
  });
});
