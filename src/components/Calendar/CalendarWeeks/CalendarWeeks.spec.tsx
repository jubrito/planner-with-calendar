import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import CalendarWeeks from './CalendarWeeks';
import { getWeekDaysNames } from '../../../utils/calendar/weeks';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';

describe('CalendarWeeks', () => {
  const localeLang = 'en-US';
  it('should render calendar week labels abbreviated', () => {
    renderWithProviders(
      <table>
        <CalendarWeeks />
      </table>,
    );
    getWeekDaysNames(localeLang).forEach((weekDay) => {
      const weekNameElement = screen.getByRole('columnheader', {
        name: weekDay.long,
      });
      expect(weekNameElement).toBeInTheDocument();
      expect(weekNameElement.textContent).toContain(weekDay.short);
    });
  });
  it('should display initials instead of long week name if compact mode is true', () => {
    renderWithProviders(
      <table>
        <CalendarWeeks compactMode />
      </table>,
    );
    getWeekDaysNames(localeLang).forEach((weekDay) => {
      const weekNameElement = screen.getByRole('columnheader', {
        name: weekDay.long,
      });
      expect(weekNameElement.textContent).toBe(weekDay.initial);
    });
  });
});
