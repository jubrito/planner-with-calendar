import { useSelector } from 'react-redux';
import { Modal } from '../../../Modal/Modal';
import { getModalContent } from '../../../../utils/events/dayView/getModalInfo';
import { getLocaleLanguage } from '../../../../redux/slices/localeSlice/selectors';
import { memo } from 'react';
import { getCurrentSelectedDayViewEvent } from '../../../../redux/slices/eventSlice/selectors';

type EventDetailsModalProps = {
  closeModal: () => void;
};

export const EventDetailsModal = memo(
  ({ closeModal }: EventDetailsModalProps) => {
    const locale = useSelector(getLocaleLanguage());
    const selectedDayViewEvent = useSelector(getCurrentSelectedDayViewEvent());

    if (!selectedDayViewEvent || !selectedDayViewEvent.event) return <></>;

    const { event: selectedEvent, top } = selectedDayViewEvent;
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
      <Modal
        title={title}
        content={
          <>
            {isSameDayEvent && <p title={sameDayTitle}>{sameDayContent}</p>}
            {!isSameDayEvent && <p title={multiDayTitle}>{multiDayContent}</p>}
          </>
        }
        style={{ top }}
        closeModal={{ handleClose: closeModal }}
      />
    );
  },
);
