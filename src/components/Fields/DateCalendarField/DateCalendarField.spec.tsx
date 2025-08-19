import { fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getDateISOString } from '../../../utils/calendar/utils';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { DateCalendarField } from './DateCalendarField';
import userEvent from '@testing-library/user-event';
import { enterKey } from '../../../utils/constants';
import { Months } from '../../../types/calendar/enums';

describe('DateCalendarField', () => {
  const dateLabel = 'dateLabel';
  const className = 'className';
  const value = 'value';
  const errorMessage = 'label';
  const isFieldReadOnly = true;
  const onCellClick = jest.fn();
  const defaultYear = 1957;
  const defaultMonth = Months.DECEMBER;
  const someDay = 27;
  const date = new Date(defaultYear, defaultMonth, someDay);
  const initialISODate = getDateISOString(date);
  const someCellLabel = `Dec ${someDay} of ${defaultYear}`;

  it('should render calendar based on date field year and month', async () => {
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
    const dateField = screen.getByLabelText(dateLabel);
    await userEvent.click(dateField);
    const calendar = screen.getByRole('table');
    const cellButton = within(calendar).getByRole('button', {
      name: someCellLabel,
    });
    expect(cellButton).toBeInTheDocument();
  });

  it('should update date input when clicking on a cell', async () => {
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
    let dateField = screen.getByLabelText(dateLabel);
    await userEvent.click(dateField);
    const calendar = screen.getByRole('table');
    const cellButton = within(calendar).getByRole('button', {
      name: someCellLabel,
    });
    await userEvent.click(cellButton);
    dateField = screen.getByLabelText(dateLabel);
    expect(dateField).toHaveValue(`Friday, December ${someDay}`);
  });

  describe('Default rendering', () => {
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
    it('should display date calendar when clicking on date input (key down)', async () => {
      const dateField = screen.getByLabelText(dateLabel);
      fireEvent.keyDown(dateField, { key: enterKey });
      const calendar = screen.getByRole('table');
      expect(calendar).toBeInTheDocument();
    });

    it('should call date on click function when clicking on calendar (mouse)', async () => {
      const dateField = screen.getByLabelText(dateLabel);
      await userEvent.click(dateField);
      const calendar = screen.getByRole('table');
      const cellButton = within(calendar).getByRole('button', {
        name: someCellLabel,
      });
      await userEvent.click(cellButton);
      expect(onCellClick).toHaveBeenCalled();
    });

    it('should call date on click function when clicking on calendar (key down)', () => {
      const dateField = screen.getByLabelText(dateLabel);
      fireEvent.keyDown(dateField, { key: enterKey });
      expect(onCellClick).toHaveBeenCalled();
    });
    it.todo('should display start date error');
    it.todo('should display start hour error');

    it.todo(
      'should update end date with start date to ensure end date is greater than start date',
    );
    it.todo('should hide date calendar when clicking on date input (mouse)');
    it.todo(
      'should hide date calendar when clicking on date input (enter or space keys)',
    );
    it.todo('should hide date calendar when clicking outside the calendar');
    it.todo('should hide date calendar when pressing esc');
  });
});
