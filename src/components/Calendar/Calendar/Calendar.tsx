import { Months } from '../../../types/calendar/enums';
import { ObjectType } from '../../../types/types';
import CalendarCells from '../CalendarCells/CalendarCells';
import CalendarWeeks from '../CalendarWeeks/CalendarWeeks';

type CompactCalendarProps = {
  className?: string;
  compactMode?: boolean;
  onCellClick: (cellYear: number, cellMonth: Months, cellDay: number) => void;
  defaultYear?: number;
  defaultMonth?: Months;
  props?: ObjectType;
};

export const Calendar = ({
  className,
  compactMode,
  onCellClick,
  defaultYear,
  defaultMonth,
  props,
}: CompactCalendarProps) => {
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
