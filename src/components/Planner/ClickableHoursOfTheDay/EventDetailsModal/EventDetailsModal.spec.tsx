import { Months } from '../../../../types/calendar/enums';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { EventDetailsModal } from './EventDetailsModal';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { get2DigitsValue } from '../../../../utils/calendar/utils';

describe('EventDetailsModal', () => {
  const title = 'title';
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 11;
  const startHour = 1;
  const startMinutes = 59;
  const endHour = 11;
  const endMinutes = 59;
  const weekDay = 'Tue';
  const monthName = 'Feb';
  const startDate = new Date(year, month, day, startHour, startMinutes);
  const endDate = new Date(year, month, day, endHour, endMinutes);
  const startPeriod = 'AM';
  const toggleDetailsModalMock = jest.fn();

  beforeEach(() => {
    renderWithProviders(
      <EventDetailsModal
        startDate={startDate}
        endDate={endDate}
        title={title}
        toggleDetailsModal={toggleDetailsModalMock}
      />,
    );
  });

  it('should render modal title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render modal with same day event within same period', () => {
    const date = `${weekDay}, ${monthName} ${day}`;
    const separator = '⋅';
    const startTime = `${get2DigitsValue(startDate.getHours())}:${get2DigitsValue(startDate.getMinutes())}`;
    const endTime = `${get2DigitsValue(endDate.getHours())}:${get2DigitsValue(endDate.getMinutes())}`;
    const fullTime = `${date} ${separator} ${startTime} – ${endTime} ${startPeriod}`;
    const timeElement = screen.getByText(fullTime);
    const title = `Event on ${date} from ${startTime} to ${endTime} ${startPeriod}`;
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty('title', title);
  });
});
