import { useCallback, useEffect, useRef, useState } from 'react';
import { EventOnUpdate } from '../types/event';
import { validateEventOnUpdate } from '../utils/events/validation';

export const useManageEventUpdates = (
  initialEvent?: Partial<EventOnUpdate>,
) => {
  const now = new Date();
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const initialIdRef = useRef<string>(null);
  const [eventFields, setEventFields] = useState<EventOnUpdate>({
    id: '',
    title: '',
    startDate: now,
    endDate: now,
    location: '',
    description: '',
    ...initialEvent,
  });

  const validateEventFields = useCallback(
    (eventData = initialEvent) => {
      const validationErrors = validateEventOnUpdate(eventData || eventFields);
      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    },
    [eventFields, initialEvent],
  );

  const updateEventField = useCallback(
    <K extends keyof EventOnUpdate>(field: K, newValue: EventOnUpdate[K]) => {
      setEventFields((prevEventFields) => ({
        ...prevEventFields,
        [field]: newValue,
      }));
      setIsDirty(true);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined,
      }));
    },
    [],
  );

  useEffect(() => {
    if (initialEvent?.id != null && initialEvent.id !== initialIdRef.current) {
      initialIdRef.current = initialEvent.id;
      setEventFields((prevEventFields) => ({
        ...prevEventFields,
        initialEvent,
      }));

      // setErrors({});
      setIsDirty(false);
      validateEventFields(initialEvent);
    }
  }, [initialEvent, initialEvent?.id, validateEventFields]);

  return {
    errors,
    isDirty,
    eventFields,
    updateEventField,
    validateEventFields,
  };
};
