import { useSelector } from 'react-redux';
import { getWeekDaysNames } from '../../../../utils/calendar/weeks';
import styles from './_calendar-weeks.module.scss';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';

type CalendarWeeksProps = {
  compactMode?: boolean;
};
const CalendarWeeks = ({ compactMode = false }: CalendarWeeksProps) => {
  const localeLang = useSelector(getLocaleLanguage());
  const weekDays = getWeekDaysNames(localeLang);
  return (
    <thead className={styles.weekDaysContainer}>
      <tr>
        {weekDays.map((weekDay) => {
          return (
            <th
              scope="col"
              role="columnheader"
              className={styles.weekDays}
              key={weekDay.long}
            >
              <abbr key={weekDay.long} title={weekDay.long} role="columnheader">
                {compactMode && (
                  <span aria-hidden="true">{weekDay.initial}</span>
                )}
                {!compactMode && (
                  <>
                    <span aria-hidden="true" className={styles.shortWeekName}>
                      {weekDay.short}
                    </span>
                    <span aria-hidden="true" className={styles.initialWeekName}>
                      {weekDay.initial}
                    </span>
                  </>
                )}
              </abbr>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CalendarWeeks;
