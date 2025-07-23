import { Months } from '../../../types/calendar/enums';
import CalendarCells from '../CalendarCells/CalendarCells';
import CalendarWeeks from '../CalendarWeeks/CalendarWeeks';

type CompactCalendarProps = {
  className?: string;
  compactMode?: boolean;
  onCellClick: (cellYear: number, cellMonth: Months, cellDay: number) => void;
};

export const Calendar = ({
  className,
  compactMode,
  onCellClick,
}: CompactCalendarProps) => {
  return (
    <table className={className}>
      <CalendarWeeks compactMode={compactMode} />
      <CalendarCells compactMode={compactMode} onCellClick={onCellClick} />
    </table>
  );
};
