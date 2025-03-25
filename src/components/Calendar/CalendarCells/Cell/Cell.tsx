import { useSelector } from "react-redux";
import { DateConfig } from "../../../../types/calendar/types";
import { getFullDateTitle } from "../../../../utils/calendar/utils";
import calendarCellsStyles from "../_calendar-cells.module.scss";
import cellsStyles from "./_cell.module.scss";
import { getLocaleLanguage } from "../../../../redux/slices/localeSlice/selectors";
import { isToday } from "../../../../utils/checkers";
import { getFormatedDate } from "../../../../utils/calendar/current";

type CellProps = {
  cellYear: DateConfig["year"];
  cellMonth: DateConfig["month"];
  cellDay: DateConfig["day"];
  currentMonth: DateConfig["month"];
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
  const formatedDate = getFormatedDate(
    localeString,
    new Date(cellYear, cellMonthZeroIndexed, cellDay)
  );

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
      <div>
        <time
          dateTime={fullDate}
          title={getFullDateTitle(
            cellYear,
            cellMonthZeroIndexed,
            cellDay,
            localeString
          )}
        >
          <span
            aria-hidden="true"
            tabIndex={-1}
            className={
              isToday(localeString, formatedDate)
                ? cellsStyles.isToday
                : undefined
            }
          >
            {cellDay}
          </span>
        </time>
      </div>
    </td>
  );
};
