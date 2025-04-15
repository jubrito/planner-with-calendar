import userEvent from '@testing-library/user-event';
import { Months } from '../../../../types/calendar/enums';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { EventBlock } from '../ClickableHoursOfTheDay';
import { Event } from './Event';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('Event', () => {
  const year = 2025;
  const month = Months.APRIL;
  const day = 11;
  const event: EventBlock = {
    eventId: 'id',
    title: 'title',
    start: {
      positionY: 4,
      fixedPositionY: 0,
      date: new Date(year, month, day, 0, 0),
      block: {
        fifteenMinBlock: 0,
        hour: 0,
        minutes: 0,
      },
    },
    end: {
      positionY: 43,
      fixedPositionY: 50,
      date: new Date(year, month, day, 1, 0),
      block: {
        fifteenMinBlock: 4,
        hour: 1,
        minutes: 0,
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
  describe('Hours display when locale lang is english', () => {
    it('should display event with only one AM/PM if the even is within the same period', () => {
      renderWithProviders(<Event event={event} />);
      expect(screen.getByText('12:00 – 01:00 AM')).toBeInTheDocument();
    });
  });
});
