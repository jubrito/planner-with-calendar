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
import { Months } from '../../../../../types/calendar/enums';

type CellProps = {
  cellYear: DateConfig['year'];
  cellMonth: DateConfig['month'];
  cellDay: DateConfig['day'];
  currentMonth: DateConfig['month'];
  onClick: (cellYear: number, cellMonth: Months, cellDay: number) => void;
  compactMode?: boolean;
};

export const Cell = ({
  cellYear,
  cellMonth,
  cellDay,
  currentMonth,
  onClick,
  compactMode = false,
}: CellProps) => {
  const fullDate = `${cellYear}-${cellMonth}-${cellDay}`;
  const localeString = useSelector(getLocaleLanguage());
  const month = cellMonth - 1;
  const date = new Date(cellYear, month, cellDay);

  return (
    <td
      scope="col"
      role="cell"
      key={`${cellYear} +
      ${cellMonth} +
      ${cellDay}`}
      className={
        compactMode
          ? calendarCellsStyles.compactMonthDay
          : month === currentMonth
            ? calendarCellsStyles.currentMonthDay
            : calendarCellsStyles.otherMonthDay
      }
    >
      <div className={cellsStyles.buttonOpenPlanner}>
        <button
          aria-label={`${getMonthName(localeString, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear}`}
          title={`${getMonthName(localeString, date, IntlDateTimeFormatShort)} ${cellDay} of ${cellYear}`}
          onClick={() => onClick(cellYear, cellMonth, cellDay)}
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
