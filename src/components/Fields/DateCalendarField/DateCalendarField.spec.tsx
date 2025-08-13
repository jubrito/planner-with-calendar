import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getDateISOString } from '../../../utils/calendar/utils';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { DateCalendarField } from './DateCalendarField';
import userEvent from '@testing-library/user-event';

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
  it('should render start date field label with id', () => {
    const dateField = screen.getByLabelText(dateLabel);
    expect(dateField).toBeInTheDocument();
    expect(dateField.id).toBe(dateLabel);
  });

  it('should render date field with read only properties as true', () => {
    const dateField = screen.getByLabelText(dateLabel);
    expect(dateField).toHaveAttribute('readonly');
    expect(dateField).toHaveAttribute('aria-readonly', 'true');
  });

  it('should render end date field with aria error message', () => {
    const dateField = screen.getByLabelText(dateLabel);
    expect(dateField).toHaveAttribute('aria-errormessage', errorMessage);
  });

  it('should render date field as input', () => {
    const dateField = screen.getByRole('textbox', {
      name: dateLabel,
    });
    expect(dateField).toBeInTheDocument();
  });

  it('should display date calendar when clicking on date input (mouse)', async () => {
    const dateField = screen.getByLabelText(dateLabel);
    await userEvent.click(dateField);
    const calendar = screen.getByRole('table');
    expect(calendar).toBeInTheDocument();
  });
  it.todo(
    'should display date calendar when clicking on date input (key down)',
  );
  it.todo('should call start date on click function when clicking on calendar');
  it.todo('should call end date on click function when clicking on calendar');
});
