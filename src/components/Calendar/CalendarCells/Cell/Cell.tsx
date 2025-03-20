import { useSelector } from "react-redux";
import { DateConfig } from "../../../../types/calendar/types";
import { getFullDateTitle } from "../../../../utils/calendar/utils";
import calendarCellsStyles from "../_calendar-cells.module.scss";
import cellsStyles from "./_cell.module.scss";
import { getLocaleLanguage } from "../../../../redux/slices/localeSlice/selectors";
import { isToday } from "../../../../utils/calendar/current";

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
  return (
    <td
      scope="col"
      key={`${cellYear} +
      ${cellMonth} +
      ${cellDay}`}
      className={
        cellMonth === currentMonth + 1
          ? calendarCellsStyles.currentMonthDay
          : calendarCellsStyles.otherMonthDay
      }
    >
      <div>
        <time
          dateTime={fullDate}
          title={getFullDateTitle(
            cellYear,
            cellMonth - 1,
            cellDay,
            localeString
          )}
        >
          <span
            aria-hidden="true"
            tabIndex={-1}
            className={
              isToday(cellYear, cellMonth - 1, cellDay)
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
