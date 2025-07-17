import { useCallback, useEffect, useState } from 'react';
import { EventOnUpdate } from '../types/event';
import { validateEventOnUpdate } from '../utils/events/validation';

export const useManageEventUpdates = (initialEvent?: EventOnUpdate) => {
  const now = new Date();
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});

  const [eventFields, setEventFields] = useState<EventOnUpdate>({
    id: '',
    title: '',
    startDate: now,
    endDate: now,
    location: '',
    description: '',
    ...initialEvent,
  });

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

  const validateEventFields = useCallback(() => {
    const validationErrors = validateEventOnUpdate(eventFields);
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  }, [eventFields]);

  useEffect(() => {
    if (!initialEvent) return;

    setEventFields((prevEventFields) => ({
      ...prevEventFields,
      initialEvent,
    }));
    setErrors({});
    setIsDirty(false);
  }, [initialEvent]);

  return {
    errors,
    isDirty,
    eventFields,
    updateEventField,
    validateEventFields,
  };
};
