import { useSelector } from 'react-redux';
import { memo, RefObject } from 'react';
import { getLocaleLanguage } from '../../../../../redux/slices/localeSlice/selectors';
import { getCurrenteventOnViewMode } from '../../../../../redux/slices/eventSlice/selectors';
import { getEventModalContent } from '../../../../../utils/events/dayView/getModalInfo';
import { Modal } from '../../../../../components/Modal/Modal';
import { dashSeparator } from '../../../../../utils/constants';

type EventDetailsModalProps = {
  closeModal: () => void;
  editModal: () => void;
  viewEventModalRef: RefObject<HTMLDivElement | null>;
};

export const EventDetailsModal = memo(
  ({ closeModal, editModal, viewEventModalRef }: EventDetailsModalProps) => {
    const locale = useSelector(getLocaleLanguage());
    const eventOnViewMode = useSelector(getCurrenteventOnViewMode());

    if (!eventOnViewMode || !eventOnViewMode.event) return <></>;

    const { event: selectedEvent, top } = eventOnViewMode;
    const { title } = selectedEvent;
    const { sameDay, multiDay, isSameDayEvent } = getEventModalContent(
      selectedEvent.startDate,
      selectedEvent.endDate,
      locale,
    );

    return (
      <Modal
        title={
          <p>
            <strong>{title}</strong>
          </p>
        }
        content={
          <>
            {isSameDayEvent && (
              <div title={sameDay?.title}>
                <p aria-hidden={true}>{sameDay?.start}</p>
                <p aria-hidden={true}>{sameDay?.end}</p>
              </div>
            )}
            {!isSameDayEvent && (
              <p title={multiDay?.title}>
                {multiDay?.start} {dashSeparator} {multiDay?.end}
              </p>
            )}
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
