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
    <div onClick={() => updateDate()} aria-label={`Display ${label}`}>
      <span aria-hidden="false">{symbol}</span>
    </div>
  );
};
