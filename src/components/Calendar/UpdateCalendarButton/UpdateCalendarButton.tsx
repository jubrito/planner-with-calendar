import { todayLabel } from "../../../utils/calendar/constants";
import styles from "./_update-calendar-button.module.scss";

type UpdateCalendarButtonProps = {
  label: string;
  symbol: string;
  updateDate: () => void;
};

export const UpdateCalendarButton = ({
  label,
  symbol,
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
      <span aria-hidden="false">{symbol}</span>
    </button>
  );
};
