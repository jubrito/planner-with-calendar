import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "../../../redux/slices/dateSlice";
import {
  getNextMonthIndex,
  getNextMonthYear,
} from "../../../utils/calendar/next";
import {
  getPreviousMonthIndex,
  getPreviousMonthYear,
} from "../../../utils/calendar/previous";
import { UpdateCalendarButton } from "../UpdateCalendarButton/UpdateCalendarButton";
import { getLocaleLanguage } from "../../../redux/slices/localeSlice/selectors";
import {
  getSelectedDate,
  getSelectedDay,
  getSelectedMonth,
  getSelectedYear,
} from "../../../redux/slices/dateSlice/selectors";
import { getCurrentMonthName } from "../../../utils/calendar/current";
import styles from "./_calendar-menu.module.scss";

export const CalendarMenu = () => {
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const date = useSelector(getSelectedDate(locale));
  const day = useSelector(getSelectedDay(locale));
  const year = useSelector(getSelectedYear());
  const month = useSelector(getSelectedMonth(locale));
  const currentMonthName = getCurrentMonthName(locale, date);

  return (
    <div className={styles.calendarHeader}>
      <h2 className={styles.monthLabel} id="calendar-month-name">
        {`${currentMonthName}, ${year}`}
      </h2>
      <div className={styles.updateCalendarContainer}>
        <UpdateCalendarButton
          label={"Go to previous year"}
          symbol={"<<"}
          updateDate={() =>
            dispatch(updateDate({ year: year - 1, month, day }))
          }
        />
        <UpdateCalendarButton
          label={"Go to previous month"}
          symbol={"<"}
          updateDate={() =>
            dispatch(
              updateDate({
                year: getPreviousMonthYear(year, month),
                month: getPreviousMonthIndex(month),
                day,
              })
            )
          }
        />
        <UpdateCalendarButton
          label={"Go to today"}
          symbol={"Today"}
          updateDate={() =>
            dispatch(
              updateDate({
                year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate(),
              })
            )
          }
        />
        <UpdateCalendarButton
          label={"Go to next month"}
          symbol={">"}
          updateDate={() =>
            dispatch(
              updateDate({
                year: getNextMonthYear(year, month),
                month: getNextMonthIndex(month),
                day,
              })
            )
          }
        />
        <UpdateCalendarButton
          label={"Go to next year"}
          symbol={">>"}
          updateDate={() =>
            dispatch(updateDate({ year: year + 1, month, day }))
          }
        />
      </div>
    </div>
  );
};
