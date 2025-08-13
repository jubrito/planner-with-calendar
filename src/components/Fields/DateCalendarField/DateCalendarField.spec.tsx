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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let container: HTMLElement;

  beforeEach(() => {
    const { container: HTMLContainer } = renderWithProviders(
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
    container = HTMLContainer;
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
      name: `Dec ${someDay} of ${defaultYear}`,
    });
    await userEvent.click(cellButton);
    expect(onCellClick).toHaveBeenCalled();
  });

  it('should call date on click function when clicking on calendar (key down)', () => {
    const dateField = screen.getByLabelText(dateLabel);
    fireEvent.keyDown(dateField, { key: enterKey });
    expect(onCellClick).toHaveBeenCalled();
  });

  it.skip('should hide date calendar when clicking on date input (mouse)', async () => {
    const dateField = screen.getByLabelText(dateLabel);
    await userEvent.click(dateField);
    const calendar = screen.getByRole('table');
    expect(calendar).toBeInTheDocument();
    // const dayViewContainer = container.firstElementChild;
  });
});
