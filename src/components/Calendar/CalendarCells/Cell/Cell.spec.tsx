import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/dom';
import { Cell } from './Cell';
import { Months } from '../../../../types/calendar/enums';
import {
  getDateISOString,
  getFullDateTitle,
  getMonthName,
} from '../../../../utils/calendar/utils';
import { firstDayOfTheMonth } from '../../../../utils/calendar/constants';
import { renderWithProviders } from '../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../redux/slices/dateSlice';
import { IntlDateTimeFormatShort } from '../../../../utils/constants';
import userEvent from '@testing-library/user-event';

const cellYear = 2025;
const cellDay = firstDayOfTheMonth;
const currentMonth = Months.JANUARY;
const localeMock = 'en-US';
const onCellClick = jest.fn();

describe('Cell', () => {
  interface TestTableProps {
    cellMonth: Months;
  }
  const TestTable = ({ cellMonth }: TestTableProps) => (
    <table>
      <tbody>
        <tr>
          <Cell
            cellYear={cellYear}
            cellMonth={cellMonth}
            cellDay={cellDay}
            currentMonth={currentMonth}
            onClick={onCellClick}
          />
        </tr>
      </tbody>
    </table>
  );

  it('should render cell with correct elements when cell month equals current month', () => {
    renderWithProviders(<TestTable cellMonth={currentMonth} />, {
      preloadedState: {
        dateSlice: {
          currentState: {
            ...initialValue.currentState,
            globalISODate: getDateISOString(
              new Date(cellYear, currentMonth, cellDay),
            ),
          },
          initialState: {
            ...initialValue.initialState,
          },
        },
      },
    });
    const tdElement = screen.getByRole('cell');
    const timeElement = within(tdElement).getByRole('time');
    const cellMonthZeroIndexed = -1;
    const date = new Date(cellYear, cellMonthZeroIndexed, cellDay);
    const openDayViewLabel = `${getMonthName(localeMock, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear}`;
    const openDayViewButton = within(tdElement).getByRole('button', {
      name: openDayViewLabel,
    });
    const fullDate = `${cellYear}-${currentMonth}-${cellDay}`;
    const fullDateTitle = getFullDateTitle(
      cellYear,
      currentMonth - 1,
      cellDay,
      localeMock,
    );

    expect(tdElement).toBeInTheDocument();
    expect(openDayViewButton).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty('dateTime', fullDate);
    expect(timeElement).toHaveProperty('title', fullDateTitle);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });
  it('should render cell with correct elements when cell month is NOT equal to current month', () => {
    const nextMonth = Months.FEBRUARY;
    renderWithProviders(<TestTable cellMonth={nextMonth} />, {
      preloadedState: {
        dateSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            globalISODate: getDateISOString(
              new Date(cellYear, currentMonth, cellDay),
            ),
          },
        },
      },
    });

    const tdElement = screen.getByRole('cell');
    const timeElement = within(tdElement).getByRole('time');
    const fullDate = `${cellYear}-${nextMonth}-${cellDay}`;
    const fullDateTitle = getFullDateTitle(
      cellYear,
      nextMonth - 1,
      cellDay,
      localeMock,
    );

    expect(tdElement).toBeInTheDocument();
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveProperty('dateTime', fullDate);
    expect(timeElement).toHaveProperty('title', fullDateTitle);
    expect(timeElement).toHaveTextContent(cellDay.toString());
  });

  it('should call onClick function (onCellClick) when clicking on the cell', async () => {
    const nextMonth = Months.FEBRUARY;
    renderWithProviders(<TestTable cellMonth={nextMonth} />, {
      preloadedState: {
        dateSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            globalISODate: getDateISOString(
              new Date(cellYear, currentMonth, cellDay),
            ),
          },
        },
      },
    });
    const dayCell = screen.getByTitle(
      getFullDateTitle(cellYear, currentMonth, cellDay, localeMock),
    );
    await userEvent.click(dayCell);
    const monthNotZeroIndexed = currentMonth + 1;
    expect(onCellClick).toHaveBeenCalledWith(
      cellYear,
      monthNotZeroIndexed,
      cellDay,
    );
    expect(onCellClick).toHaveBeenCalledTimes(1);
  });
});
