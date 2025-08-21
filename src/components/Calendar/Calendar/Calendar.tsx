import { Months } from '../../../types/calendar/enums';
import CalendarCells from '../CalendarCells/CalendarCells';
import CalendarWeeks from '../CalendarWeeks/CalendarWeeks';

type CalendarProps = {
  className?: string;
  compactMode?: boolean;
  onCellClick: (cellYear: number, cellMonth: Months, cellDay: number) => void;
  defaultYear?: number;
  defaultMonth?: Months;
};

type ExtendedCalendarProps = CalendarProps &
  React.HTMLAttributes<HTMLDivElement>;

export const Calendar = ({
  className,
  compactMode,
  onCellClick,
  defaultYear,
  defaultMonth,
  ...props
}: ExtendedCalendarProps) => {
  return (
    <table className={className} {...props}>
      <CalendarWeeks compactMode={compactMode} />
      <CalendarCells
        compactMode={compactMode}
        onCellClick={onCellClick}
        year={defaultYear}
        month={defaultMonth}
      />
    </table>
  );
};
