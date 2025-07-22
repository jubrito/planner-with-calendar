import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalISODate } from '../../../../redux/slices/dateSlice';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import {
  getSelectedGlobalDay,
  getSelectedGlobalMonth,
  getSelectedGlobalMonthName,
  getSelectedGlobalYear,
} from '../../../../redux/slices/dateSlice/selectors';
import styles from './_calendar-menu.module.scss';
import { IntlDateTimeFormatLong } from '../../../../utils/constants';
import {
  getDay,
  getMonthIndex,
  getYear,
} from '../../../../utils/calendar/utils';
import { CalendarActions } from '../../../../components/Calendar/CalendarActions/CalendarActions';

export const CalendarMenu = () => {
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const day = useSelector(getSelectedGlobalDay());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(locale));
  const currentMonthName = useSelector(
    getSelectedGlobalMonthName(locale, IntlDateTimeFormatLong),
  );

  const updateYear = {
    previous: () =>
      dispatch(updateGlobalISODate({ year: year - 1, month, day })),
    next: () => dispatch(updateGlobalISODate({ year: year + 1, month, day })),
  };
  const updateMonth = {
    previous: () =>
      dispatch(
        updateGlobalISODate({
          year: getYear(new Date(year, month - 1)),
          month: getMonthIndex(locale, new Date(year, month - 1, day)),
          day,
        }),
      ),
    next: () =>
      dispatch(
        updateGlobalISODate({
          year: getYear(new Date(year, month + 1)),
          month: getMonthIndex(locale, new Date(year, month + 1, day)),
          day,
        }),
      ),
  };

  return (
    <div className={styles.calendarHeader}>
      <h2 className={styles.monthLabel} id="calendar-month-name">
        {`${currentMonthName}, ${year}`}
      </h2>
      <CalendarActions
        updateYear={updateYear}
        updateMonth={updateMonth}
        updateToday={() =>
          dispatch(
            updateGlobalISODate({
              year: getYear(new Date()),
              month: getMonthIndex(locale, new Date()),
              day: getDay(new Date()),
            }),
          )
        }
      />
    </div>
  );
};
