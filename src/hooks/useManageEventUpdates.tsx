import { useCallback, useEffect, useRef, useState } from 'react';
import { EventStored } from '../types/event';
import { getEventErrors } from '../utils/events/validation';
import { getDateISOString } from '../utils/calendar/utils';

export type FieldsErrors = Partial<
  Record<keyof EventStored, string | undefined>
>;

export const useManageEventUpdates = (initialEvent?: Partial<EventStored>) => {
  const now = new Date();
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<FieldsErrors>({});
  const initialIdRef = useRef<string>(null);
  const [eventFields, setEventFields] = useState<EventStored>({
    id: '',
    title: '',
    startDate: getDateISOString(now),
    endDate: getDateISOString(now),
    location: '',
    description: '',
    ...initialEvent,
  });

  const clearFieldOnUpdateErrors = (field: keyof EventStored) => {
    setErrors((prevErrors: FieldsErrors) => {
      const currentErrors: FieldsErrors = { ...prevErrors };
      if (currentErrors[field] != null) {
        delete currentErrors[field];
      }
      return currentErrors;
    });
  };

  const findEventFieldsErrors = useCallback(
    (eventData?: Partial<EventStored>) => {
      let fieldsToValidade = eventData;
      if (fieldsToValidade == null) {
        fieldsToValidade = eventFields;
      }
      const validationErrors = getEventErrors(fieldsToValidade);
      setErrors(validationErrors);
      const foundErrors = Object.keys(validationErrors).length != 0;
      return foundErrors;
    },
    [eventFields],
  );

  const updateEventField = useCallback(
    <K extends keyof EventStored>(field: K, newValue: EventStored[K]) => {
      setEventFields((prevEventFields) => ({
        ...prevEventFields,
        [field]: newValue,
      }));
      setIsDirty(true);
      clearFieldOnUpdateErrors(field);
    },
    [],
  );

  useEffect(() => {
    if (initialEvent?.id != null && initialEvent.id !== initialIdRef.current) {
      initialIdRef.current = initialEvent.id;
      setEventFields((prevEventFields) => ({
        ...prevEventFields,
        ...initialEvent,
      }));

      setIsDirty(false);
      findEventFieldsErrors(initialEvent);
    }
  }, [initialEvent, initialEvent?.id, findEventFieldsErrors]);

  return {
    errors,
    isDirty,
    eventFields,
    updateEventField,
    findEventFieldsErrors,
  };
};
