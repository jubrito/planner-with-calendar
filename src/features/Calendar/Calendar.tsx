import CalendarCells from "../../components/Calendar/CalendarCells/CalendarCells";
import CalendarWeeks from "../../components/Calendar/CalendarWeeks/CalendarWeeks";
import { UpdateCalendarButton } from "../../components/Calendar/UpdateCalendarButton/UpdateCalendarButton";
import { getCurrentMonthName } from "../../utils/calendar/current";
import { getNextMonthIndex, getNextMonthYear } from "../../utils/calendar/next";
import {
  getPreviousMonthIndex,
  getPreviousMonthYear,
} from "../../utils/calendar/previous";
import styles from "./_calendar.module.scss";
import { useSelector } from "react-redux";
import {
  getCurrentDate,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
} from "../../redux/slices/dateSlice/selectors";
import { useDispatch } from "react-redux";
import { updateDate } from "../../redux/slices/dateSlice";
import { getLocaleLanguage } from "../../redux/slices/localeSlice/selectors";

const Calendar = () => {
  const localeLang = useSelector(getLocaleLanguage());
  const date = useSelector(getCurrentDate());
  const day = useSelector(getCurrentDay());
  const year = useSelector(getCurrentYear());
  const month = useSelector(getCurrentMonth());
  const dispatch = useDispatch();

  const currentMonthName = getCurrentMonthName(date, localeLang);

  return (
    <section className={styles.calendar}>
      <div className={styles.calendarHeader}>
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
          updateDate={() =>
            dispatch(updateDate({ year: year + 1, month, day }))
          }
        />
      </div>
      <table aria-labelledby="calendar-month-name">
        <CalendarWeeks />
        <CalendarCells />
      </table>
    </section>
  );
};

export default Calendar;
