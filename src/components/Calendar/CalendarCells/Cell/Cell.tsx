import { useSelector } from 'react-redux';
import { DateConfig } from '../../../../types/calendar/types';
import {
  getFullDateTitle,
  getMonthName,
} from '../../../../utils/calendar/utils';
import calendarCellsStyles from '../_calendar-cells.module.scss';
import cellsStyles from './_cell.module.scss';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { isToday } from '../../../../utils/checkers';
import { IntlDateTimeFormatShort } from '../../../../utils/constants';

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
  const cellMonthZeroIndexed = cellMonth - 1;
  const date = new Date(cellYear, cellMonthZeroIndexed, cellDay);

  return (
    <td
      scope="col"
      role="cell"
      key={`${cellYear} +
      ${cellMonth} +
      ${cellDay}`}
      className={
        cellMonthZeroIndexed === currentMonth
          ? calendarCellsStyles.currentMonthDay
          : calendarCellsStyles.otherMonthDay
      }
    >
      <div className={cellsStyles.buttonOpenPlanner}>
        <button
          aria-label={`Open ${getMonthName(localeString, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear} day view`}
          title={`Open ${getMonthName(localeString, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear} day view`}
        >
          <time
            dateTime={fullDate}
            title={getFullDateTitle(
              cellYear,
              cellMonthZeroIndexed,
              cellDay,
              localeString,
            )}
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
