import { todayLabel } from '../../../utils/calendar/constants';
import styles from './_update-calendar-button.module.scss';

type UpdateCalendarButtonProps = {
  label: string;
  symbol?: string;
  icon?: React.ReactElement;
  updateDate: () => void;
};

export const UpdateCalendarButton = ({
  label,
  symbol,
  icon,
  updateDate,
}: UpdateCalendarButtonProps) => {
  const className =
    symbol === todayLabel
      ? styles.updateCalendarToToday
      : styles.updateCalendar;

  return (
    <button
      onClick={updateDate}
      aria-label={label}
      className={className}
      title={label}
    >
      {symbol && <span aria-hidden="true">{symbol}</span>}
      {icon && <span aria-hidden="true">{icon}</span>}
    </button>
  );
};
