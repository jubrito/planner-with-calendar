import '@testing-library/jest-dom';
import { screen, within } from '@testing-library/dom';
import { Cell } from './Cell';
import { Months } from '../../../../../types/calendar/enums';
import {
  getFullDateTitle,
  getMonthName,
} from '../../../../../utils/calendar/utils';
import { firstDayOfTheMonth } from '../../../../../utils/calendar/constants';
import { renderWithProviders } from '../../../../../utils/tests/renderWithProviders';
import { initialValue } from '../../../../../redux/slices/dateSlice';
import { initialValue as initialEventValue } from '../../../../../redux/slices/eventSlice';
import { IntlDateTimeFormatShort } from '../../../../../utils/constants';
import { EventStored } from '../../../../../types/event';
import userEvent from '@testing-library/user-event';

const cellYear = 2025;
const cellDay = firstDayOfTheMonth;
const currentMonth = Months.JANUARY;
const localeMock = 'en-US';

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
            globalISODate: new Date(
              cellYear,
              currentMonth,
              cellDay,
            ).toDateString(),
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
    const openDayViewLabel = `Open ${getMonthName(localeMock, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear} day view`;
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
            globalISODate: new Date(
              cellYear,
              currentMonth,
              cellDay,
            ).toDateString(),
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

  it('should hide modal with event details when selecting a different date by clicking on a cell', async () => {
    const nextMonth = Months.FEBRUARY;
    const initialEvent: EventStored = {
      id: '',
      title: '',
      endDate: '',
      startDate: '',
    };
    const initialSelectedDayViewEvent = {
      event: initialEvent,
      top: 101,
    };
    const { store } = renderWithProviders(<TestTable cellMonth={nextMonth} />, {
      preloadedState: {
        dateSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            globalISODate: new Date(
              cellYear,
              currentMonth,
              cellDay,
            ).toDateString(),
          },
        },
        eventSlice: {
          ...initialEventValue,
          currentState: {
            ...initialEventValue.currentState,
            selectedDayViewEvent: initialSelectedDayViewEvent,
          },
        },
      },
    });
    const tdElement = screen.getByRole('cell');
    const buttonElement = within(tdElement).getByRole('button');
    let selectedDayViewEvent =
      store.getState().eventSlice.currentState.selectedDayViewEvent;

    expect(selectedDayViewEvent?.top).toBe(initialSelectedDayViewEvent.top);
    expect(selectedDayViewEvent?.event).toBe(initialSelectedDayViewEvent.event);

    await userEvent.click(buttonElement);

    selectedDayViewEvent =
      store.getState().eventSlice.currentState.selectedDayViewEvent;

    expect(selectedDayViewEvent).toBeUndefined();
  });

  it('should change day view date when to update planner by clicking on cell', async () => {
    const cellMonth = Months.FEBRUARY;
    const initialDayViewISODate = new Date(
      2025,
      Months.DECEMBER,
      17,
    ).toISOString();
    const cellDate = new Date(cellYear, currentMonth, cellDay).toISOString();
    const { store } = renderWithProviders(<TestTable cellMonth={cellMonth} />, {
      preloadedState: {
        dateSlice: {
          ...initialValue,
          currentState: {
            ...initialValue.currentState,
            globalISODate: cellDate,
            dayViewISODate: initialDayViewISODate,
          },
        },
      },
    });
    const tdElement = screen.getByRole('cell');
    const buttonElement = within(tdElement).getByRole('button');
    const cellDateStored =
      store.getState().dateSlice.currentState.globalISODate;

    let dayViewISODate = store.getState().dateSlice.currentState.dayViewISODate;
    expect(dayViewISODate).toBe(initialDayViewISODate);

    await userEvent.click(buttonElement);

    dayViewISODate = store.getState().dateSlice.currentState.dayViewISODate;

    expect(dayViewISODate).toBe(cellDateStored);
  });
});
