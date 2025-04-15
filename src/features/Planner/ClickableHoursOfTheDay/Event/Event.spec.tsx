import userEvent from '@testing-library/user-event';
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

  it('should call event on click if provided', async () => {
    const onClickMock = jest.fn();
    const { container } = renderWithProviders(
      <Event event={event} onClick={onClickMock} />,
    );
    const eventElement = container.firstElementChild;
    if (eventElement) {
      await userEvent.click(eventElement);
    }
    expect(onClickMock).toHaveBeenCalled();
  });
  describe('Hours display when using 12-hour clock system', () => {
    it('should display event with only one AM/PM if the event start and end is within the same period', () => {
      renderWithProviders(<Event event={event} />);
      expect(screen.getByText('12:00 – 01:00 AM')).toBeInTheDocument();
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
      expect(screen.getByText('11:00 AM – 12:15 PM')).toBeInTheDocument();
    });
  });
  describe('Hours display when using 24-hour clock system', () => {
    it('should display time correctly when event start and end is within the same period', () => {
      renderWithProviders(<Event event={event} />, {
        preloadedState: {
          localeSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              locale: {
                lang: 'PT-br',
              },
            },
          },
        },
      });
      expect(screen.getByText('00:00 – 01:00')).toBeInTheDocument();
    });
  });
});
