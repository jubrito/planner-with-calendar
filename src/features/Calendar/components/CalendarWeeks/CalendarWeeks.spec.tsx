import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import CalendarWeeks from './CalendarWeeks';
import { getWeekDaysNames } from '../../../../utils/calendar/weeks';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';

describe('CalendarWeeks', () => {
  it('should render calendar week labels abbreviated', () => {
    renderWithProviders(
      <table>
        <CalendarWeeks />
      </table>,
    );
    getWeekDaysNames('en-US').forEach((weekDay) => {
      expect(
        screen.getByRole('columnheader', { name: weekDay.long }),
      ).toBeInTheDocument();
    });
  });
});
