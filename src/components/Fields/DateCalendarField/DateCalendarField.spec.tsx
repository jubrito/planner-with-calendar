import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getDateISOString } from '../../../utils/calendar/utils';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { DateCalendarField } from './DateCalendarField';

describe('DateCalendarField', () => {
  const dateLabel = 'dateLabel';
  const className = 'className';
  const value = 'value';
  const errorMessage = 'label';
  const isFieldReadOnly = true;
  const onCellClick = jest.fn();
  const date = new Date();
  const initialISODate = getDateISOString(date);

  beforeEach(() => {
    renderWithProviders(
      <DateCalendarField
        dateLabel={dateLabel}
        className={className}
        value={value}
        errorMessage={errorMessage}
        isFieldReadOnly={isFieldReadOnly}
        onCellClick={onCellClick}
        initialISODate={initialISODate}
      />,
    );
  });
  it('should render end date field with read only properties as true', () => {
    const endDateField = screen.getByLabelText(dateLabel);
    expect(endDateField).toHaveAttribute('readonly');
    expect(endDateField).toHaveAttribute('aria-readonly', 'true');
  });
});
