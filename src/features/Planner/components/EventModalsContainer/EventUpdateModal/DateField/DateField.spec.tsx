import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DateField } from './DateField';
import userEvent from '@testing-library/user-event';

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

  describe('Date field', () => {
    it('should render date field with label', () => {
      const dateField = screen.getByLabelText(label.dateField);
      expect(dateField).toBeInTheDocument();
      expect(dateField.id).toBe(label.dateField);
    });
    it('should render date field as input', () => {
      const dateField = screen.getByRole('textbox', { name: label.dateField });
      expect(dateField).toBeInTheDocument();
    });
    it('should render date field with read only properties as true', () => {
      const dateField = screen.getByLabelText(label.dateField);
      expect(dateField).toHaveAttribute('readonly');
      expect(dateField).toHaveAttribute('aria-readonly', 'true');
    });
    it('should render date field with aria error message', () => {
      const dateField = screen.getByLabelText(label.dateField);
      expect(dateField).toHaveAttribute('aria-errormessage', errorMessage);
    });
    it('should call date field on click function', async () => {
      const dateField = screen.getByLabelText(label.dateField);
      await userEvent.click(dateField);
      expect(onClick.dateField).toHaveBeenCalled();
    });
  });

  describe('Hour field', () => {
    it('should render hour field with label', () => {
      const hourField = screen.getByLabelText(label.hourField);
      expect(hourField).toBeInTheDocument();
      expect(hourField.id).toBe(label.hourField);
    });
    it('should render hour field as input', () => {
      const hourField = screen.getByRole('textbox', { name: label.hourField });
      expect(hourField).toBeInTheDocument();
    });
    it('should render hour field with read only properties as true', () => {
      const hourField = screen.getByLabelText(label.hourField);
      expect(hourField).toHaveAttribute('readonly');
      expect(hourField).toHaveAttribute('aria-readonly', 'true');
    });
    it('should render hour field with aria error message', () => {
      const hourField = screen.getByLabelText(label.hourField);
      expect(hourField).toHaveAttribute('aria-errormessage', errorMessage);
    });
  });
});
