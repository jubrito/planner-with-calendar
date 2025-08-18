import { useSelector } from 'react-redux';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';
import { getHoursOfTheDay } from '../../../utils/calendar/utils';
import { Dropdown } from '../../Dropdown/Dropdown';

type TimeField = {
  id: string;
  className?: string;
  label: {
    text: string | number;
    srOnly: boolean;
  };
  placeholder?: string;
  value: string | number;
  onClick: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
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
      onValueUpdate={() => {
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
