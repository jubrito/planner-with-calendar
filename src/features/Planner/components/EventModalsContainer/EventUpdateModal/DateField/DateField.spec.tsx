import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateField } from './DateField';

describe('DateField', () => {
  const label = {
    dateField: 'startDateLabel',
    hourField: 'startHourLabel',
  };
  const value = {
    dateField: '0',
    hourField: 1,
  };
  const errorMessage = 'Error message';
  const onClick = {
    dateField: jest.fn(),
    hourField: jest.fn(),
  };
  const icon = 'icon';

  beforeEach(() => {
    render(
      <DateField
        label={label}
        value={value}
        errorMessage={errorMessage}
        className={{ wrapper: '', field: '' }}
        onClick={onClick}
        icon={<>{icon}</>}
        readonly={true}
      />,
    );
  });
  it('should render icon', () => {
    expect(screen.getByText(icon)).toBeInTheDocument();
  });
  it('should render date field with label', () => {
    const dateField = screen.getByLabelText(label.dateField);
    expect(dateField).toBeInTheDocument();
    expect(dateField.id).toBe(label.dateField);
  });
  it('should render date field as input', () => {
    const dateField = screen.getByRole('textbox', { name: label.dateField });
    expect(dateField).toBeInTheDocument();
  });
});
