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
  getCurrentDate,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "../../../redux/slices/dateSlice/selectors";
import { getCurrentMonthName } from "../../../utils/calendar/current";
import styles from "./_calendar-menu.module.scss";

export const CalendarMenu = () => {
  const dispatch = useDispatch();
  const localeLang = useSelector(getLocaleLanguage());
  const date = useSelector(getCurrentDate());
  const day = useSelector(getCurrentDay());
  const year = useSelector(getCurrentYear());
  const month = useSelector(getCurrentMonth());
  const currentMonthName = getCurrentMonthName(date, localeLang);

  return (
    <div className={styles.calendarHeader}>
      <UpdateCalendarButton
        label={"Go to previous year"}
        symbol={"<<"}
        updateDate={() => dispatch(updateDate({ year: year - 1, month, day }))}
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
      <h2 className={styles.monthLabel} id="calendar-month-name">
        {`${currentMonthName}, ${year}`}
      </h2>
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
        updateDate={() => dispatch(updateDate({ year: year + 1, month, day }))}
      />
    </div>
  );
};
