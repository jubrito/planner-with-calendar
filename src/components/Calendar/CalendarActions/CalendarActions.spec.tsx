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
      const goToPreviousYearButton = screen.getByRole('button', {
        name: goToPreviousYearLabel,
      });

      await userEvent.click(goToPreviousYearButton);

      await waitFor(() => {
        expect(updateYear.previous).toHaveBeenCalledTimes(1);
      });
    });

    it('should call previous month function when clicking on previous month button', async () => {
      const goToPreviousMonthButton = screen.getByRole('button', {
        name: goToPreviousMonthLabel,
      });

      await userEvent.click(goToPreviousMonthButton);

      await waitFor(() => {
        expect(updateMonth.previous).toHaveBeenCalledTimes(1);
      });
    });

    it('should call today function when clicking on today button', async () => {
      const goToTodayButton = screen.getByRole('button', {
        name: goToTodayLabel,
      });

      await userEvent.click(goToTodayButton);

      await waitFor(() => {
        expect(updateToday).toHaveBeenCalledTimes(1);
      });
    });

    it('should call next month function when clicking on next month button', async () => {
      const goToNextMonthButton = screen.getByRole('button', {
        name: goToNextMonthLabel,
      });

      await userEvent.click(goToNextMonthButton);

      await waitFor(() => {
        expect(updateMonth.next).toHaveBeenCalledTimes(1);
      });
    });
  });
});
