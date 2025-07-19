import { useDispatch, useSelector } from 'react-redux';
import { updateGlobalISODate } from '../../../../redux/slices/dateSlice';
import { UpdateCalendarButton } from '../UpdateCalendarButton/UpdateCalendarButton';
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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const CalendarMenu = () => {
  const dispatch = useDispatch();
  const locale = useSelector(getLocaleLanguage());
  const day = useSelector(getSelectedGlobalDay());
  const year = useSelector(getSelectedGlobalYear());
  const month = useSelector(getSelectedGlobalMonth(locale));
  const currentMonthName = useSelector(
    getSelectedGlobalMonthName(locale, IntlDateTimeFormatLong),
  );

  return (
    <div className={styles.calendarHeader}>
      <h2 className={styles.monthLabel} id="calendar-month-name">
        {`${currentMonthName}, ${year}`}
      </h2>
      <div className={styles.updateCalendarContainer}>
        <UpdateCalendarButton
          label={'Go to previous year'}
          icon={<KeyboardDoubleArrowLeftIcon />}
          updateDate={() =>
            dispatch(updateGlobalISODate({ year: year - 1, month, day }))
          }
        />
        <UpdateCalendarButton
          label={'Go to previous month'}
          icon={<KeyboardArrowLeftIcon />}
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
          icon={<KeyboardArrowRightIcon />}
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
          icon={<KeyboardDoubleArrowRightIcon />}
          updateDate={() =>
            dispatch(updateGlobalISODate({ year: year + 1, month, day }))
          }
        />
      </div>
    </div>
  );
};
