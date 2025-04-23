import { Months } from '../../../../types/calendar/enums';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { EventDetailsModal } from './EventDetailsModal';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('EventDetailsModal', () => {
  const title = 'title';
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 11;
  const hour = 1;
  const minutes = 59;
  const startDate = new Date(year, month, day, hour, minutes);
  const endDate = new Date(year, month, day, hour, minutes);
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

  // it('should render modal with same day event', () => {
  //   const titleText = screen.getByText(title)
  //   expect()
  // });
});
