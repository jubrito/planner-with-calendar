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

  return {
    errors,
    isDirty,
    eventFields,
    updateEventField,
  };
};
