import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import {
  getSelectedDayViewDay,
  getSelectedDayViewDayOfWeek,
  getSelectedDayViewMonth,
  getSelectedDayViewMonthName,
  getSelectedDayViewYear,
} from '../../redux/slices/dateSlice/selectors';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import { IntlDateTimeFormatShort } from '../../utils/constants';
import { HoursOfTheDay } from './HoursOfTheDay/HoursOfTheDay';
import { ClickableHoursOfTheDay } from './ClickableHoursOfTheDay/ClickableHoursOfTheDay';
import { getHoursOfTheDay } from '../../utils/calendar/utils';
import { EventHandlerType } from '../../types/calendar/types';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const monthName = useSelector(
    getSelectedDayViewMonthName(locale, IntlDateTimeFormatShort),
  );
  const year = useSelector(getSelectedDayViewYear());
  const day = useSelector(getSelectedDayViewDay());
  const monthIndex = useSelector(getSelectedDayViewMonth(locale));
  const hoursOfTheDay = getHoursOfTheDay(locale, year, monthIndex, day);
  const dayOfWeek = useSelector(getSelectedDayViewDayOfWeek(locale));
  const plannerDateLabel = `${monthName} ${day}, ${dayOfWeek}`;

  // const getElementIdentifier = (index: number, hourOfTheDay: string) =>
  //   `hourblock_${index}_${hourOfTheDay}`.replace(' ', '');

  // let test = '';
  const handleClickHourOfTheDayBlock = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    eventType: EventHandlerType,
  ) => {
    console.log('handleClickHourOfTheDayBlock eventType', eventType);
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;
    console.log({ relativeX, relativeY });
  };

  // useEffect(() => {
  //   const clickListener = (event) => {
  //     if (event && event.currentTarget) {
  //       console.log('clicked event', event.currentTarget.);
  //     }
  //     // "clientX: " + event.clientX +
  //     // " - clientY: " + event.clientY;
  //   };
  //   addEventListener('click', clickListener);

  //   return () => removeEventListener('click', clickListener);
  // }, []);

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {plannerDateLabel}
        </h2>
      </div>
      <div className={styles.plannerHours}>
        <HoursOfTheDay hoursOfTheDay={hoursOfTheDay} />
        <ClickableHoursOfTheDay
          handleMouseInteraction={handleClickHourOfTheDayBlock}
          hoursOfTheDay={hoursOfTheDay}
        />
      </div>
    </section>
  );
};

export default Planner;
