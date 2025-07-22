import { UpdateCalendarButton } from '../UpdateCalendarButton/UpdateCalendarButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import styles from './_calendar-actions.module.scss';

type CalendarActionsProps = {
  updateYear: {
    previous: () => void;
    next: () => void;
  };
  updateMonth: {
    previous: () => void;
    next: () => void;
  };
  updateToday: () => void;
};

export const CalendarActions = ({
  updateYear,
  updateMonth,
  updateToday,
}: CalendarActionsProps) => {
  return (
    <div className={styles.updateCalendarContainer}>
      <UpdateCalendarButton
        label={'Previous year'}
        icon={<KeyboardDoubleArrowLeftIcon />}
        updateDate={() => updateYear.previous()}
      />
      <UpdateCalendarButton
        label={'Previous month'}
        icon={<KeyboardArrowLeftIcon />}
        updateDate={() => updateMonth.previous()}
      />
      <UpdateCalendarButton
        label={'Go to today'}
        symbol={'Today'}
        updateDate={() => updateToday()}
      />
      <UpdateCalendarButton
        label={'Next month'}
        icon={<KeyboardArrowRightIcon />}
        updateDate={() => updateMonth.next()}
      />
      <UpdateCalendarButton
        label={'Next year'}
        icon={<KeyboardDoubleArrowRightIcon />}
        updateDate={() => updateYear.next()}
      />
    </div>
  );
};
