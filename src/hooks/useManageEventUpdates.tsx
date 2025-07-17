import { useCallback, useState } from 'react';
import { EventOnUpdateView } from '../types/event';

export const useManageEventUpdates = (initialEvent?: EventOnUpdateView) => {
  const now = new Date();
  const [isDirty, setIsDirty] = useState(false);

  const [eventFields, setEventFields] = useState<EventOnUpdateView>({
    id: '',
    title: '',
    startDate: now,
    endDate: now,
    location: '',
    description: '',
    ...initialEvent,
  });

  return {
    isDirty,
    eventFields,
  };
};
