import { useSelector } from 'react-redux';
import { DateConfig } from '../../../../../types/calendar/types';
import {
  getFullDateTitle,
  getMonthName,
} from '../../../../../utils/calendar/utils';
import calendarCellsStyles from '../_calendar-cells.module.scss';
import cellsStyles from './_cell.module.scss';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { isToday } from '../../../../../utils/checkers';
import { IntlDateTimeFormatShort } from '../../../../../utils/constants';
import { useDispatch } from 'react-redux';
import { updateDayViewISODate } from '../../../../../redux/slices/dateSlice';
import { cleareventOnViewMode } from '../../../../../redux/slices/eventSlice';

type CellProps = {
  cellYear: DateConfig['year'];
  cellMonth: DateConfig['month'];
  cellDay: DateConfig['day'];
  currentMonth: DateConfig['month'];
};

export const Cell = ({
  cellYear,
  cellMonth,
  cellDay,
  currentMonth,
}: CellProps) => {
  const fullDate = `${cellYear}-${cellMonth}-${cellDay}`;
  const localeString = useSelector(getLocaleLanguage());
  const month = cellMonth - 1;
  const date = new Date(cellYear, month, cellDay);
  const dispatch = useDispatch();

  const handleUpdateDayViewDate = () => {
    dispatch(
      updateDayViewISODate({
        year: cellYear,
        month: cellMonth - 1,
        day: cellDay,
      }),
    );
    dispatch(
      // hide view events modal
      cleareventOnViewMode(),
    );
  };

  return (
    <td
      scope="col"
      role="cell"
      key={`${cellYear} +
      ${cellMonth} +
      ${cellDay}`}
      className={
        month === currentMonth
          ? calendarCellsStyles.currentMonthDay
          : calendarCellsStyles.otherMonthDay
      }
    >
      <div className={cellsStyles.buttonOpenPlanner}>
        <button
          aria-label={`Open ${getMonthName(localeString, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear} day view`}
          title={`Open ${getMonthName(localeString, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear} day view`}
          onClick={() => handleUpdateDayViewDate()}
        >
          <time
            dateTime={fullDate}
            title={getFullDateTitle(cellYear, month, cellDay, localeString)}
            className={
              isToday(localeString, date) ? cellsStyles.isToday : undefined
            }
          >
            {cellDay}
          </time>
        </button>
      </div>
    </td>
  );
};
