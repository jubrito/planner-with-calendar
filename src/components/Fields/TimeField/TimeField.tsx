import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { getHourPeriod, getHoursOfTheDay } from '../../../utils/calendar/utils';
import { Dropdown } from '../../Dropdown/Dropdown';
import { OptionType } from '../../../types/types';
import {
  getSelectedDayViewDay,
  getSelectedDayViewMonth,
  getSelectedDayViewYear,
} from '../../../redux/slices/dateSlice/selectors';

type TimeField = {
  id: string;
  className?: string;
  label: {
    text: string | number;
    srOnly: boolean;
  };
  placeholder?: string;
  hour: number;
  onClick?: (event: OptionType) => void;
  errorMessage?: string;
  readOnly?: boolean;
};

export const TimeField = ({
  errorMessage,
  hour,
  className,
  label,
  id,
  placeholder,
  onClick,
  readOnly = false,
}: TimeField) => {
  const locale = useSelector(getLocaleLanguage());
  const year = useSelector(getSelectedDayViewYear());
  const month = useSelector(getSelectedDayViewMonth(locale));
  const day = useSelector(getSelectedDayViewDay());
  const hoursOfTheDay = getHoursOfTheDay(locale);
  const formatedValue = getHourPeriod(locale, new Date(year, month, day, hour));

  return (
    <Dropdown
      id={id}
      className={className}
      initialValue={formatedValue}
      label={label}
      onValueUpdate={(event) => {
        if (onClick) {
          console.log('onClick juju');
          onClick(event);
        }
        console.log('field clicked', hour);
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      errorMessage={errorMessage}
      options={hoursOfTheDay.map((timeOption, index) => ({
        key: index,
        content: timeOption,
      }))}
      inputStyle={{ width: '75px' }}
    />
  );
};
