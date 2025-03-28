import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalISODate } from '../../../redux/slices/dateSlice';
import { UpdateCalendarButton } from '../UpdateCalendarButton/UpdateCalendarButton';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import {
  getSelectedDay,
  getSelectedMonth,
  getSelectedMonthName,
  getSelectedYear,
} from '../../../redux/slices/dateSlice/selectors';
import styles from './_calendar-menu.module.scss';
import { IntlDateTimeFormatLong } from '../../../utils/constants';
import { getDay, getMonthIndex, getYear } from '../../../utils/calendar/utils';

export const CalendarMenu = () => {
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const day = useSelector(getSelectedDay());
  const year = useSelector(getSelectedYear());
  const month = useSelector(getSelectedMonth(locale));
  const currentMonthName = useSelector(
    getSelectedMonthName(locale, IntlDateTimeFormatLong),
  );

  return (
    <div className={styles.calendarHeader}>
      <h2 className={styles.monthLabel} id="calendar-month-name">
        {`${currentMonthName}, ${year}`}
      </h2>
      <div className={styles.updateCalendarContainer}>
        <UpdateCalendarButton
          label={'Go to previous year'}
          symbol={'<<'}
          updateDate={() =>
            dispatch(updateGlobalISODate({ year: year - 1, month, day }))
          }
        />
        <UpdateCalendarButton
          label={'Go to previous month'}
          symbol={'<'}
          updateDate={() =>
            dispatch(
              updateGlobalISODate({
                year: getYear(new Date(year, month - 1)),
                month: getMonthIndex(locale, new Date(year, month - 1, day)),
                day,
              }),
            )
          }
        />
        <UpdateCalendarButton
          label={'Go to today'}
          symbol={'Today'}
          updateDate={() => {
            return dispatch(
              updateGlobalISODate({
                year: getYear(new Date()),
                month: getMonthIndex(locale, new Date()),
                day: getDay(new Date()),
              }),
            );
          }}
        />
        <UpdateCalendarButton
          label={'Go to next month'}
          symbol={'>'}
          updateDate={() =>
            dispatch(
              updateGlobalISODate({
                year: getYear(new Date(year, month + 1)),
                month: getMonthIndex(locale, new Date(year, month + 1, day)),
                day,
              }),
            )
          }
        />
        <UpdateCalendarButton
          label={'Go to next year'}
          symbol={'>>'}
          updateDate={() =>
            dispatch(updateGlobalISODate({ year: year + 1, month, day }))
          }
        />
      </div>
    </div>
  );
};
