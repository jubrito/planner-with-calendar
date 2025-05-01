import { useSelector } from 'react-redux';
import { EventOnSave } from '../../../types/event';
import { ObjectType } from '../../../utils/constants';
import { Modal } from '../../Modal/Modal';
import { getModalContent } from '../../../utils/events/dayView/getModalInfo';
import { getLocaleLanguage } from '../../../redux/slices/localeSlice/selectors';

type EventModalsContainerProps = {
  selectedEvent?: EventOnSave;
  viewEventDetailsStyle: ObjectType;
  closeModal: () => void;
};

export const EventModalsContainer = ({
  selectedEvent,
  viewEventDetailsStyle,
  closeModal,
}: EventModalsContainerProps) => {
  const locale = useSelector(getLocaleLanguage());
  if (!selectedEvent) return <></>;
  const { title } = selectedEvent;

  const modalContent = () => {
    const { sameDay, multiDay, isSameDayEvent } = getModalContent(
      selectedEvent.startDate,
      selectedEvent.endDate,
      locale,
    );
    return {
      sameDayContent: sameDay.content,
      sameDayTitle: sameDay.title,
      multiDayContent: multiDay.content,
      multiDayTitle: multiDay.title,
      isSameDayEvent,
    };
  };

  const {
    isSameDayEvent,
    multiDayContent,
    multiDayTitle,
    sameDayContent,
    sameDayTitle,
  } = modalContent();

  return (
    <>
      <Modal
        title={title}
        content={
          <>
            {isSameDayEvent && <p title={sameDayTitle}>{sameDayContent}</p>}
            {!isSameDayEvent && <p title={multiDayTitle}>{multiDayContent}</p>}
          </>
        }
        style={viewEventDetailsStyle}
        closeModal={{
          closeLabel: 'Close',
          handleClose: closeModal,
        }}
      />
    </>
  );
};
