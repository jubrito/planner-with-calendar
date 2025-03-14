import useLocale from "../../../../hooks/useLocale";
import { DateConfig } from "../../../../types/calendar/types";
import { getFullDateTitle } from "../../../../utils/calendar/utils";
import styles from "../_calendar-cells.module.scss";

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
  const { locale } = useLocale();
  console.log("cellYear", cellYear);
  console.log("cellMonth", cellMonth);
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
          title={getFullDateTitle(cellYear, cellMonth - 1, cellDay, locale)}
        >
          <span aria-hidden="true" tabIndex={-1}>
            {cellDay}
          </span>
        </time>
      </div>
    </td>
  );
};
