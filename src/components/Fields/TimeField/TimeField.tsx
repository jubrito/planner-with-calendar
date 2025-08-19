import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { getHoursOfTheDay } from '../../../utils/calendar/utils';
import { Dropdown } from '../../Dropdown/Dropdown';
import { OptionType } from '../../../types/types';

type TimeField = {
  id: string;
  className?: string;
  label: {
    text: string | number;
    srOnly: boolean;
  };
  placeholder?: string;
  value: string | number;
  onClick?: (event: OptionType) => void;
  errorMessage?: string;
  readOnly?: boolean;
};

export const TimeField = ({
  errorMessage,
  value,
  className,
  label,
  id,
  placeholder,
  onClick,
  readOnly = false,
}: TimeField) => {
  const locale = useSelector(getLocaleLanguage());
  const hoursOfTheDay = getHoursOfTheDay(locale);

  return (
    <Dropdown
      id={id}
      className={className}
      initialValue={value}
      label={label}
      onValueUpdate={(event) => {
        if (onClick) {
          console.log('onClick juju');
          onClick(event);
        }
        console.log('field clicked', value);
      }}
      placeholder={placeholder}
      readOnly={readOnly}
      errorMessage={errorMessage}
      options={hoursOfTheDay.map((timeOption, index) => ({
        key: index,
        content: timeOption,
      }))}
      inputStyle={{ width: '65px' }}
    />
  );
};
