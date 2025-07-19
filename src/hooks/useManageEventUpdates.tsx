import { useCallback, useEffect, useRef, useState } from 'react';
import { EventOnUpdate } from '../types/event';
import { validateEventOnUpdate } from '../utils/events/validation';

export type FieldsErrors = Partial<
  Record<keyof EventOnUpdate, string | undefined>
>;

export const useManageEventUpdates = (
  initialEvent?: Partial<EventOnUpdate>,
) => {
  const now = new Date();
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<FieldsErrors>({});
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

  const clearFieldOnUpdateErrors = (field: keyof EventOnUpdate) => {
    setErrors((prevErrors: FieldsErrors) => {
      const currentErrors: FieldsErrors = { ...prevErrors };
      if (currentErrors[field] != null) {
        delete currentErrors[field];
      }
      return currentErrors;
    });
  };

  const findEventFieldsErrors = useCallback(
    (eventData?: Partial<EventOnUpdate>) => {
      let fieldsToValidade = eventData;
      if (fieldsToValidade == null) {
        fieldsToValidade = eventFields;
      }
      const validationErrors = validateEventOnUpdate(fieldsToValidade);
      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
    },
    [eventFields],
  );

  const updateEventField = useCallback(
    <K extends keyof EventOnUpdate>(field: K, newValue: EventOnUpdate[K]) => {
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
