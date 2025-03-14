import { DateConfig } from "../../../../types/calendar/types";
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
      <time dateTime={fullDate} title={fullDate}>
        <span aria-hidden="true" tabIndex={-1}>
          {cellDay}
        </span>
      </time>
    </td>
  );
};
