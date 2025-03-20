import { useSelector } from "react-redux";
import { DateConfig } from "../../../../types/calendar/types";
import { getFullDateTitle } from "../../../../utils/calendar/utils";
import styles from "../_calendar-cells.module.scss";
import { getLocaleLanguage } from "../../../../redux/slices/localeSlice/selectors";

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
          ? styles.currentMonthDay
          : styles.otherMonthDay
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
          <span aria-hidden="true" tabIndex={-1}>
            {cellDay}
          </span>
        </time>
      </div>
    </td>
  );
};
