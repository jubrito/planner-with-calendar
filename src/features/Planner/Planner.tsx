import { useSelector } from 'react-redux';
import styles from './_planner.module.scss';
import { getInitialDate } from '../../redux/slices/dateSlice/selectors';
import { useDate } from '../../hooks/useDate';
import { getLocaleLanguage } from '../../redux/slices/localeSlice/selectors';
import { getHoursOfTheDay, getMonthName } from '../../utils/calendar/utils';
import { IntlDateTimeFormatShort } from '../../utils/constants';
// import {
//   getFormatedDate,
//   getFormatedDateString,
// } from '../../utils/calendar/current';

const Planner = () => {
  const locale = useSelector(getLocaleLanguage());
  const initialDate = useSelector(getInitialDate(locale));
  const { date, year, month, day, dayOfWeek } = useDate(locale, initialDate);
  const monthName = getMonthName(locale, date, IntlDateTimeFormatShort);

  const hoursOfTheDay = getHoursOfTheDay(locale, year, month, day);

  // const formatedDateStringBr = getFormatedDateString('pt-BR', date);
  // const formatedDateBr = getFormatedDate('pt-BR', date);
  // console.log('formatedDateStringBr', formatedDateStringBr);
  // console.log('formatedBr', formatedDateBr);
  // console.log('new Date()', new Date().toString());
  // console.log('parse(formatedDateBr)');
  // const formatedEnUs = getFormatedDateString('en-US', date);
  // const parsedPtBr = parse(formatedEnUs, 'EEE dd MMM yyyy', new Date(), {
  //   locale:
  // });
  // const parsedEnUs = parse(formatedBr, 'EEE MMM dd yyyy', new Date(), {
  //   locale: 'en-US',
  // });
  // const parsedPtBr = parse(formatedEnUs, 'EEE dd MMM yyyy', new Date(), {
  // const parsedEnUs = parse(formatedBr,)

  // console.log('parsedPtBr', parsedPtBr);

  return (
    <section className={styles.planner}>
      <div className={styles.plannerHeader}>
        <h2 className={styles.plannerHeaderLabel} id="calendar-month-name">
          {`${monthName} ${day}, ${dayOfWeek}`}
        </h2>
      </div>
      <div className={styles.hoursWrapper}>
        <div className={styles.hoursOfTheDayWrapper}>
          <div className={styles.hoursOfTheDay}>
            {hoursOfTheDay.map((hourOfTheDay, index) => {
              return (
                <div
                  className={styles.hoursOfTheDayRow}
                  key={hourOfTheDay + index}
                >
                  <span className={styles.hoursOfTheDay}>{hourOfTheDay}</span>
                  <span className={styles.hoursOfTheDayLine}></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planner;
