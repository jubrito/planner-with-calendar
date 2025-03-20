import { todayLabel } from "../../../utils/calendar/utils";
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
  const combinedClassNames =
    symbol === todayLabel
      ? styles.updateCalendarToToday
      : styles.updateCalendar;
  return (
    <button
      onClick={updateDate}
      aria-label={label}
      className={combinedClassNames}
      title={label}
    >
      <span aria-hidden="false">{symbol}</span>
    </button>
  );
};
