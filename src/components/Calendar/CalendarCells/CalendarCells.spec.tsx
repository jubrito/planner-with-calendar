import { screen, waitFor } from '@testing-library/dom';
import CalendarCells from './CalendarCells';
import '@testing-library/jest-dom';
import { Months } from '../../../types/calendar/enums';
import { ReactElement } from 'react';
import { getFullDateTitle, getMonthName } from '../../../utils/calendar/utils';
import { initialValue } from '../../../redux/slices/dateSlice';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { IntlDateTimeFormatShort } from '../../../utils/constants';
import userEvent from '@testing-library/user-event';

describe('CalendarCells', () => {
  const withTableWrapper = (children: ReactElement) => {
    return <table>{children}</table>;
  };
  const localeMock = 'en-US';

  describe('Non-leap year', () => {
    const currentYear = 2025;

    /**  January, 2025
     * Note: Calendar starts on a Monday
     * Since January 1 is a Wednesday, December 30 and December 31
     * of 2024 should be displayed before January days.
     * All 31 days of January should be displayed.
     * Since January ends on a Friday, February 1 and 2 of 2025 should
     * be displayed after January days
     */

    describe('January', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.JANUARY,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from December (previous month) to fill calendar', () => {
        const decemberDays = [30, 31];

        decemberDays.forEach((decemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear - 1,
              Months.DECEMBER,
              decemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(decemberDay.toString());
        });
      });

      it('should render days from January (current month) to fill calendar', () => {
        const januaryDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        januaryDays.forEach((januaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.JANUARY,
              januaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(januaryDay.toString());
        });
      });

      it('should render days from February (next month) to fill calendar', () => {
        const days = [1, 2];
        const daysToFillExtraRow = [3, 4, 5, 6, 7, 8, 9];
        const februaryDays = [...days, ...daysToFillExtraRow];

        februaryDays.forEach((februaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.FEBRUARY,
              februaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(februaryDay.toString());
        });
      });
    });
    describe('February', () => {
      const currentMonthNumberOfDays = 28;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.FEBRUARY,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from January (previous month) to fill calendar', () => {
        const januaryDays = [27, 28, 29, 30, 31];

        januaryDays.forEach((januaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.JANUARY,
              januaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(januaryDay.toString());
        });
      });

      it('should render days from February (current month) to fill calendar', () => {
        const februaryDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        februaryDays.forEach((februaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.FEBRUARY,
              februaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(februaryDay.toString());
        });
      });

      it('should render days from March (next month) to fill calendar', () => {
        const days = [1, 2];
        const daysToFillExtraRow = [3, 4, 5, 6, 7, 8, 9];
        const marchDays = [...days, ...daysToFillExtraRow];

        marchDays.forEach((marchDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.MARCH, marchDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(marchDay.toString());
        });
      });
    });
    describe('March', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.MARCH,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from February (previous month) to fill calendar', () => {
        const februaryDays = [24, 25, 26, 27, 28];

        februaryDays.forEach((februaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.FEBRUARY,
              februaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(februaryDay.toString());
        });
      });

      it('should render days from March (current month) to fill calendar', () => {
        const marchDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        marchDays.forEach((marchDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.MARCH, marchDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(marchDay.toString());
        });
      });

      it('should render days from April (next month) to fill calendar', () => {
        const aprilDays = [1, 2, 3, 4, 5, 6];

        aprilDays.forEach((aprilDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.APRIL, aprilDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(aprilDay.toString());
        });
      });
    });
    describe('April', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.APRIL,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from March (previous month) to fill calendar', () => {
        const marchDays = [31];

        marchDays.forEach((marchDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.MARCH, marchDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(marchDay.toString());
        });
      });

      it('should render days from April (current month) to fill calendar', () => {
        const aprilDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        aprilDays.forEach((aprilDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.APRIL, aprilDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(aprilDay.toString());
        });
      });

      it('should render days from May (next month) to fill calendar', () => {
        const days = [1, 2, 3, 4];
        const daysToFillExtraRow = [5, 6, 7, 8, 9, 10, 11];
        const mayDays = [...days, ...daysToFillExtraRow];

        mayDays.forEach((mayDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.MAY, mayDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(mayDay.toString());
        });
      });
    });
    describe('May', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.MAY,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from April (previous month) to fill calendar', () => {
        const aprilDays = [28, 29, 30];

        aprilDays.forEach((aprilDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.APRIL, aprilDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(aprilDay.toString());
        });
      });

      it('should render days from May (current month) to fill calendar', () => {
        const mayDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        mayDays.forEach((mayDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.MAY, mayDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(mayDay.toString());
        });
      });

      it('should render days from June (next month) to fill calendar', () => {
        const days = [1];
        const daysToFillExtraRow = [2, 3, 4, 5, 6, 7, 8];
        const juneDays = [...days, ...daysToFillExtraRow];

        juneDays.forEach((juneDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.JUNE, juneDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(juneDay.toString());
        });
      });
    });
    describe('June', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.JUNE,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from May (previous month) to fill calendar', () => {
        const mayDays = [26, 27, 28, 29, 30, 31];

        mayDays.forEach((mayDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.MAY, mayDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(mayDay.toString());
        });
      });

      it('should render days from June (current month) to fill calendar', () => {
        const juneDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        juneDays.forEach((juneDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.JUNE, juneDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(juneDay.toString());
        });
      });

      it('should render days from July (next month) to fill calendar', () => {
        const julyDays = [1, 2, 3, 4, 5, 6];

        julyDays.forEach((julyDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.JULY, julyDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(julyDay.toString());
        });
      });
    });
    describe('July', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.JULY,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from June (previous month) to fill calendar', () => {
        const juneDays = [30];

        juneDays.forEach((juneDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.JUNE, juneDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(juneDay.toString());
        });
      });

      it('should render days from July (current month) to fill calendar', () => {
        const julyDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        julyDays.forEach((julyDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.JULY, julyDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(julyDay.toString());
        });
      });

      it('should render days from August (next month) to fill calendar', () => {
        const days = [1, 2, 3];
        const daysToFillExtraRow = [4, 5, 6, 7, 8, 9, 10];
        const augustDays = [...days, ...daysToFillExtraRow];

        augustDays.forEach((augustDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.AUGUST, augustDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(augustDay.toString());
        });
      });
    });
    describe('August', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.AUGUST,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from July (previous month) to fill calendar', () => {
        const julyDays = [28, 29, 30, 31];

        julyDays.forEach((julyDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.JULY, julyDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(julyDay.toString());
        });
      });

      it('should render days from August (current month) to fill calendar', () => {
        const augustDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        augustDays.forEach((augustDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(currentYear, Months.AUGUST, augustDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(augustDay.toString());
        });
      });

      it('should render days from September (next month) to fill calendar', () => {
        const days = [1, 2];
        const daysToFillExtraRow = [3, 4, 5, 6, 7];
        const septemberDays = [...days, ...daysToFillExtraRow];

        septemberDays.forEach((septemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.SEPTEMBER,
              septemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(septemberDay.toString());
        });
      });
    });
    describe('September', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.SEPTEMBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should not render days from August (previous month) to fill calendar', () => {
        const dayCell = screen.queryByTitle(
          getFullDateTitle(currentYear, Months.AUGUST, 31, localeMock),
        );
        expect(dayCell).not.toBeInTheDocument();
      });

      it('should render days from September (current month) to fill calendar', () => {
        const septemberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        septemberDays.forEach((septemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.SEPTEMBER,
              septemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(septemberDay.toString());
        });
      });

      it('should render days from October (next month) to fill calendar', () => {
        const days = [1, 2, 3, 4, 5];
        const daysToFillExtraRow = [6, 7, 8, 9, 10, 11, 12];
        const octoberDays = [...days, ...daysToFillExtraRow];

        octoberDays.forEach((octoberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.OCTOBER,
              octoberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(octoberDay.toString());
        });
      });
    });
    describe('October', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.OCTOBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });
      it('should render days from September (previous month) to fill calendar', () => {
        const septemberDays = [29, 30];

        septemberDays.forEach((septemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.SEPTEMBER,
              septemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(septemberDay.toString());
        });
      });

      it('should render days from October (current month) to fill calendar', () => {
        const octoberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        octoberDays.forEach((octoberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.OCTOBER,
              octoberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(octoberDay.toString());
        });
      });

      it('should render days from November (next month) to fill calendar', () => {
        const days = [1, 2];
        const daysToFillExtraRow = [3, 4, 5, 6, 7, 8, 9];
        const novemberDays = [...days, ...daysToFillExtraRow];

        novemberDays.forEach((novemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.NOVEMBER,
              novemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(novemberDay.toString());
        });
      });
    });
    describe('November', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.NOVEMBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from October (previous month) to fill calendar', () => {
        const octoberDays = [27, 28, 29, 30, 31];

        octoberDays.forEach((octoberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.OCTOBER,
              octoberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(octoberDay.toString());
        });
      });

      it('should render days from November (current month) to fill calendar', () => {
        const novemberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        novemberDays.forEach((novemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.NOVEMBER,
              novemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(novemberDay.toString());
        });
      });

      it('should render days from December (next month) to fill calendar', () => {
        const novemberDays = [1, 2, 3, 4, 5, 6, 7];
        novemberDays.forEach((novemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.NOVEMBER,
              novemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(novemberDay.toString());
        });
      });
    });
    describe('December', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  currentYear,
                  Months.DECEMBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should not render days from November (previous month) since December starts on a Monday (first column)', () => {
        const dayCell = screen.queryByTitle(
          getFullDateTitle(currentYear, Months.NOVEMBER, 30, localeMock),
        );
        expect(dayCell).not.toBeInTheDocument();
      });

      it('should render days from December (current month) to fill calendar', () => {
        const decemberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        decemberDays.forEach((decemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear,
              Months.DECEMBER,
              decemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(decemberDay.toString());
        });
      });

      it('should render days from January (next month) to fill calendar', () => {
        const days = [1, 2, 3, 4];
        const daysToFillExtraRow = [5, 6, 7, 8, 9, 10, 11];
        const januaryDays = [...days, ...daysToFillExtraRow];

        januaryDays.forEach((januaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              currentYear + 1,
              Months.JANUARY,
              januaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(januaryDay.toString());
        });
      });
    });
  });
  describe('Leap year', () => {
    const leapYear = 2028;
    describe('January', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.JANUARY,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from December (previous month) to fill calendar', () => {
        const decemberDays = [27, 28, 29, 30, 31];

        decemberDays.forEach((decemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear - 1,
              Months.DECEMBER,
              decemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(decemberDay.toString());
        });
      });

      it('should render days from January (current month) to fill calendar', () => {
        const januaryDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        januaryDays.forEach((januaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JANUARY, januaryDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(januaryDay.toString());
        });
      });

      it('should render days from February (next month) to fill calendar', () => {
        const februaryDays = [1, 2, 3, 4, 5, 6];

        februaryDays.forEach((februaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.FEBRUARY,
              februaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(februaryDay.toString());
        });
      });
    });
    describe('February', () => {
      const currentMonthNumberOfDays = 28;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.FEBRUARY,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from January (previous month) to fill calendar', () => {
        const januaryDays = [31];

        januaryDays.forEach((januaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JANUARY, januaryDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(januaryDay.toString());
        });
      });

      it('should render days from February (current month) to fill calendar', () => {
        const februaryDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        februaryDays.forEach((februaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.FEBRUARY,
              februaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(februaryDay.toString());
        });
      });

      it('should render days from March (next month) to fill calendar', () => {
        const days = [1, 2, 3, 4, 5];
        const daysToFillExtraRow = [6, 7, 8, 9, 10, 11, 12];
        const marchDays = [...days, ...daysToFillExtraRow];

        marchDays.forEach((marchDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.MARCH, marchDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(marchDay.toString());
        });
      });
    });
    describe('March', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.MARCH,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from February (previous month) to fill calendar', () => {
        const februaryDays = [28, 29];

        februaryDays.forEach((februaryDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.FEBRUARY,
              februaryDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(februaryDay.toString());
        });
      });

      it('should render days from March (current month) to fill calendar', () => {
        const marchDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        marchDays.forEach((marchDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.MARCH, marchDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(marchDay.toString());
        });
      });

      it('should render days from April (next month) to fill calendar', () => {
        const days = [1, 2];
        const daysToFillExtraRow = [3, 4, 5, 6, 7, 8, 9];
        const aprilDays = [...days, ...daysToFillExtraRow];

        aprilDays.forEach((aprilDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.APRIL, aprilDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(aprilDay.toString());
        });
      });
    });
    describe('April', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.APRIL,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from March (previous month) to fill calendar', () => {
        const marchDays = [27, 28, 29, 30, 31];

        marchDays.forEach((marchDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.MARCH, marchDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(marchDay.toString());
        });
      });

      it('should render days from April (current month) to fill calendar', () => {
        const aprilDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        aprilDays.forEach((aprilDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.APRIL, aprilDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(aprilDay.toString());
        });
      });

      it('should render days from May (next month) to fill calendar', () => {
        const mayDaysToFillExtraRow = [1, 2, 3, 4, 5, 6, 7];
        mayDaysToFillExtraRow.forEach((mayDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.MAY, mayDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(mayDay.toString());
        });
      });
    });
    describe('May', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(leapYear, Months.MAY, 1).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should not render days from April (previous month) to fill calendar', () => {
        const dayCell = screen.queryByTitle(
          getFullDateTitle(leapYear, Months.SEPTEMBER, 30, localeMock),
        );
        expect(dayCell).not.toBeInTheDocument();
      });

      it('should render days from May (current month) to fill calendar', () => {
        const mayDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        mayDays.forEach((mayDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.MAY, mayDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(mayDay.toString());
        });
      });

      it('should render days from June (next month) to fill calendar', () => {
        const days = [1, 2, 3, 4];
        const daysToFillExtraRow = [5, 6, 7, 8, 9, 10, 11];
        const juneDays = [...days, ...daysToFillExtraRow];

        juneDays.forEach((juneDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JUNE, juneDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(juneDay.toString());
        });
      });
    });
    describe('June', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(leapYear, Months.JUNE, 1).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from May (previous month) to fill calendar', () => {
        const mayDays = [29, 30, 31];

        mayDays.forEach((mayDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.MAY, mayDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(mayDay.toString());
        });
      });

      it('should render days from June (current month) to fill calendar', () => {
        const juneDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        juneDays.forEach((juneDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JUNE, juneDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(juneDay.toString());
        });
      });

      it('should render days from July (next month) to fill calendar', () => {
        const days = [1, 2];
        const daysToFillExtraRow = [3, 4, 5, 6, 7, 8, 9];
        const julyDays = [...days, ...daysToFillExtraRow];

        julyDays.forEach((julyDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JULY, julyDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(julyDay.toString());
        });
      });
    });
    describe('July', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(leapYear, Months.JULY, 1).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from June (previous month) to fill calendar', () => {
        const juneDays = [26, 27, 28, 29, 30];

        juneDays.forEach((juneDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JUNE, juneDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(juneDay.toString());
        });
      });

      it('should render days from July (current month) to fill calendar', () => {
        const julyDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        julyDays.forEach((julyDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JULY, julyDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(julyDay.toString());
        });
      });

      it('should render days from August (next month) to fill calendar', () => {
        const days = [1, 2, 3];
        const daysToFillExtraRow = [1, 2, 3, 4, 5, 6];
        const augustDays = [...days, ...daysToFillExtraRow];
        augustDays.forEach((augustDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.AUGUST, augustDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(augustDay.toString());
        });
      });
    });
    describe('August', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.AUGUST,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from July (previous month) to fill calendar', () => {
        const julyDays = [31];

        julyDays.forEach((julyDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.JULY, julyDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(julyDay.toString());
        });
      });

      it('should render days from August (current month) to fill calendar', () => {
        const augustDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        augustDays.forEach((augustDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.AUGUST, augustDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(augustDay.toString());
        });
      });

      it('should render days from September (next month) to fill calendar', () => {
        const days = [1, 2, 3];
        const daysToFillExtraRow = [4, 5, 6, 7, 8, 9, 10];
        const septemberDays = [...days, ...daysToFillExtraRow];

        septemberDays.forEach((septemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.SEPTEMBER,
              septemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(septemberDay.toString());
        });
      });
    });
    describe('September', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.SEPTEMBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from August (previous month) to fill calendar', () => {
        const augustDays = [28, 29, 30, 31];

        augustDays.forEach((augustDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.AUGUST, augustDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(augustDay.toString());
        });
      });

      it('should render days from September (current month) to fill calendar', () => {
        const septemberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        septemberDays.forEach((septemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.SEPTEMBER,
              septemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(septemberDay.toString());
        });
      });

      it('should render days from October (next month) to fill calendar', () => {
        const days = [1];
        const daysToFillExtraRow = [3, 4, 5, 6, 7, 8];
        const octoberDays = [...days, ...daysToFillExtraRow];

        octoberDays.forEach((octoberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.OCTOBER, octoberDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(octoberDay.toString());
        });
      });
    });
    describe('October', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.OCTOBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from September (previous month) to fill calendar', () => {
        const septemberDays = [25, 26, 27, 28, 29, 30];

        septemberDays.forEach((septemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.SEPTEMBER,
              septemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(septemberDay.toString());
        });
      });

      it('should render days from October (current month) to fill calendar', () => {
        const octoberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        octoberDays.forEach((octoberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.OCTOBER, octoberDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(octoberDay.toString());
        });
      });

      it('should render days from November (next month) to fill calendar', () => {
        const novemberDays = [1, 2, 3, 4, 5];

        novemberDays.forEach((novemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.NOVEMBER,
              novemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(novemberDay.toString());
        });
      });
    });
    describe('November', () => {
      const currentMonthNumberOfDays = 30;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.NOVEMBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from October (previous month) to fill calendar', () => {
        const octoberDays = [30, 31];

        octoberDays.forEach((octoberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(leapYear, Months.OCTOBER, octoberDay, localeMock),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(octoberDay.toString());
        });
      });

      it('should render days from November (current month) to fill calendar', () => {
        const novemberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );
        novemberDays.forEach((novemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.NOVEMBER,
              novemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(novemberDay.toString());
        });
      });

      it('should render days from december (next month) to fill calendar', () => {
        const decemberDays = [1, 2, 3, 4, 5, 6, 7, 9, 10];

        decemberDays.forEach((decemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.DECEMBER,
              decemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(decemberDay.toString());
        });
      });
    });
    describe('December', () => {
      const currentMonthNumberOfDays = 31;
      beforeEach(() => {
        renderWithProviders(withTableWrapper(<CalendarCells />), {
          preloadedState: {
            dateSlice: {
              currentState: {
                ...initialValue.currentState,
                globalSODate: new Date(
                  leapYear,
                  Months.DECEMBER,
                  1,
                ).toDateString(),
              },
              initialState: {
                ...initialValue.initialState,
              },
            },
          },
        });
      });

      it('should render days from November (previous month) since December starts on a Monday (first column)', () => {
        const novemberDays = [27, 28, 29, 30];
        novemberDays.forEach((novemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.NOVEMBER,
              novemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(novemberDay.toString());
        });
      });

      it('should render days from December (current month) to fill calendar', () => {
        const decemberDays = Array.from(
          Array(currentMonthNumberOfDays).keys(),
          (day) => day + 1,
        );

        decemberDays.forEach((decemberDay) => {
          const dayCell = screen.getByTitle(
            getFullDateTitle(
              leapYear,
              Months.DECEMBER,
              decemberDay,
              localeMock,
            ),
          );
          expect(dayCell).toBeInTheDocument();
          expect(dayCell.textContent).toBe(decemberDay.toString());
        });
      });

      it('should not render days from January (next month) to fill calendar', () => {
        const dayCell = screen.queryByTitle(
          getFullDateTitle(leapYear, Months.JANUARY, 1, localeMock),
        );
        expect(dayCell).not.toBeInTheDocument();
      });
    });
  });
  describe('Actions', () => {
    it('should update dayView date when clicking on a specific calendar cell', async () => {
      const initialYear = 1998;
      const initialMonth = Months.FEBRUARY;
      const initialDay = 27;
      const newDay = 17;
      const { store } = renderWithProviders(
        <table>
          <CalendarCells />
        </table>,
        {
          preloadedState: {
            dateSlice: {
              initialState: {
                ...initialValue.initialState,
              },
              currentState: {
                ...initialValue.currentState,
                dayViewISODate: new Date(
                  initialYear,
                  initialMonth,
                  initialDay,
                ).toDateString(),
                globalSODate: new Date(
                  initialYear,
                  initialMonth,
                  initialDay,
                ).toDateString(),
              },
            },
          },
        },
      );
      const newDate = new Date(initialYear, initialMonth, newDay);
      const openDayViewLabel = `Open ${getMonthName(localeMock, newDate, IntlDateTimeFormatShort)} ${newDay} of ${initialYear} day view`;
      const openDayViewButton = screen.getByRole('button', {
        name: openDayViewLabel,
      });

      const currentDayViewISODate =
        store.getState().dateSlice.currentState.dayViewISODate;

      await waitFor(() => {
        expect(new Date(currentDayViewISODate).getDate()).toStrictEqual(
          initialDay,
        );
        expect(new Date(currentDayViewISODate).getMonth()).toStrictEqual(
          initialMonth,
        );
        expect(new Date(currentDayViewISODate).getFullYear()).toStrictEqual(
          initialYear,
        );
      });

      await userEvent.click(openDayViewButton);

      const updatedDayViewISODate =
        store.getState().dateSlice.currentState.dayViewISODate;

      await waitFor(() => {
        expect(new Date(updatedDayViewISODate).getDate()).toStrictEqual(newDay);
        expect(new Date(updatedDayViewISODate).getMonth()).toStrictEqual(
          initialMonth,
        );
        expect(new Date(updatedDayViewISODate).getFullYear()).toStrictEqual(
          initialYear,
        );
      });
    });
  });
});
