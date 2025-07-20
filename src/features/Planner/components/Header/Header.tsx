import { useSelector } from 'react-redux';
import {
  getSelectedDayViewDay,
  getSelectedDayViewDayOfWeek,
  getSelectedDayViewMonthName,
} from '../../../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormatShort } from '../../../../utils/constants';
import styles from './_header.module.scss';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import {
  drafteventOnUpdateMode,
  updateEventOnUpdateMode,
} from '../../../../redux/slices/eventSlice';

export const Header = memo(() => {
  const locale = useSelector(getLocaleLanguage());
  const monthName = useSelector(
    getSelectedDayViewMonthName(locale, IntlDateTimeFormatShort),
  );
  const day = useSelector(getSelectedDayViewDay());
  const dayOfWeek = useSelector(getSelectedDayViewDayOfWeek(locale));
  const plannerDateLabel = `${monthName} ${day}, ${dayOfWeek}`;
  const dispatch = useDispatch();

  function openUpdateEventModal() {
    dispatch(
      updateEventOnUpdateMode({
        event: drafteventOnUpdateMode,
        top: 15,
      }),
    );
  }

  return (
    <div className={styles.plannerHeader}>
      <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
        {plannerDateLabel}
      </h2>
      <button onClick={openUpdateEventModal}>Create event</button>
    </div>
  );
});
