import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CalendarActions } from './CalendarActions';
import userEvent from '@testing-library/user-event';

describe('CalendarActions', () => {
  describe('Changing calendar dates', () => {
    const year = 2025;
    const goToPreviousYearLabel = 'Previous year';
    const goToPreviousMonthLabel = 'Previous month';
    const goToNextMonthLabel = 'Next month';
    const goToNextYearLabel = 'Next year';
    const goToTodayLabel = 'Go to today';
    const updateMonth = {
      previous: jest.fn(),
      next: jest.fn(),
    };
    const updateYear = {
      previous: jest.fn(),
      next: jest.fn(),
    };
    const updateToday = jest.fn();

    beforeEach(() => {
      render(
        <CalendarActions
          updateMonth={updateMonth}
          updateYear={updateYear}
          updateToday={updateToday}
        />,
      );
    });

    it('should render buttons to enable changing calendar dates', () => {
      const goToPreviousYearButton = screen.getByRole('button', {
        name: goToPreviousYearLabel,
      });
      const goToPreviousMonthButton = screen.getByRole('button', {
        name: goToPreviousMonthLabel,
      });
      const goToNextMonthButton = screen.getByRole('button', {
        name: goToNextMonthLabel,
      });
      const goToNextYearButton = screen.getByRole('button', {
        name: goToNextYearLabel,
      });

      expect(goToPreviousYearButton).toBeInTheDocument();
      expect(goToPreviousMonthButton).toBeInTheDocument();
      expect(goToNextMonthButton).toBeInTheDocument();
      expect(goToNextYearButton).toBeInTheDocument();
    });

    it('should call previous year function when clicking on previous year button', async () => {
      const goToPreviousMonthButton = screen.getByRole('button', {
        name: goToPreviousYearLabel,
      });

      await userEvent.click(goToPreviousMonthButton);

      await waitFor(() => {
        expect(updateYear.previous).toHaveBeenCalledTimes(1);
      });
    });
  });
});
