import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { CurrentTime } from './CurrentTime';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../redux/slices/dateSlice';
import { Months } from '../../../types/calendar/enums';

describe('CurrentTime', () => {
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 11;
  const hour = 15;
  const minutes = 25;
  it('should render current hour correctly for 12-clock systems', () => {
    renderWithProviders(<CurrentTime />, {
      preloadedState: {
        dateSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            globalISODate: new Date(
              year,
              month,
              day,
              hour,
              minutes,
            ).toISOString(),
          },
        },
      },
    });
    const time = '03:25';
    const timeElement = screen.getByText(time);
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveRole('time');
    expect(timeElement).toHaveProperty('dateTime', time);
  });
});
