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
  return (
    <button
      onClick={() => updateDate()}
      aria-label={label}
      className={styles.updateCalendar}
    >
      <span aria-hidden="false">{symbol}</span>
    </button>
  );
};
