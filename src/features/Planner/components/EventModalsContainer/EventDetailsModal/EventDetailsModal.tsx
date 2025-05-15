import { useSelector } from 'react-redux';
import { memo, RefObject, useEffect } from 'react';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { getCurrentSelectedDayViewEvent } from '../../../../../redux/slices/eventSlice/selectors';
import { getModalContent } from '../../../../../utils/events/dayView/getModalInfo';
import { Modal } from '../../../../../components/Modal/Modal';

type EventDetailsModalProps = {
  closeModal: () => void;
  editModal: () => void;
  viewEventModalRef: RefObject<HTMLDivElement | null>;
};

export const EventDetailsModal = memo(
  ({ closeModal, editModal, viewEventModalRef }: EventDetailsModalProps) => {
    const locale = useSelector(getLocaleLanguage());
    const selectedDayViewEvent = useSelector(getCurrentSelectedDayViewEvent());

    useEffect(() => {
      const modalRef = viewEventModalRef.current;
      if (modalRef !== null) modalRef.focus();
    }, [viewEventModalRef]);

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
        sameDayContent: {
          date: sameDay.date,
          time: sameDay.time,
        },
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
            {isSameDayEvent && (
              <div title={sameDayTitle}>
                <p aria-hidden={true}>{sameDayContent.date}</p>
                <p aria-hidden={true}>{sameDayContent.time}</p>
              </div>
            )}
            {!isSameDayEvent && <p title={multiDayTitle}>{multiDayContent}</p>}
          </>
        }
        style={{ top }}
        closeModal={{ handleClose: closeModal }}
        editModal={{ handleEdit: editModal }}
        ref={viewEventModalRef}
      />
    );
  },
);
