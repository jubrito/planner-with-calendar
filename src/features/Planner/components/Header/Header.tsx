import { useSelector } from 'react-redux';
import {
  getSelectedDayViewDay,
  getSelectedDayViewDayOfWeek,
  getSelectedDayViewMonthName,
} from '../../../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormatShort } from '../../../../utils/constants';
import styles from './_header.module.scss';

export const Header = () => {
  const locale = useSelector(getLocaleLanguage());
  const monthName = useSelector(
    getSelectedDayViewMonthName(locale, IntlDateTimeFormatShort),
  );
  const day = useSelector(getSelectedDayViewDay());
  const dayOfWeek = useSelector(getSelectedDayViewDayOfWeek(locale));
  const plannerDateLabel = `${monthName} ${day}, ${dayOfWeek}`;

  return (
    <div className={styles.plannerHeader}>
      <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
        {plannerDateLabel}
      </h2>
    </div>
  );
};
