import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { TimeField } from './TimeField';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import userEvent from '@testing-library/user-event';

describe('TimeField', () => {
  const englishHours = [
    '12 am',
    '01 am',
    '02 am',
    '03 am',
    '04 am',
    '05 am',
    '06 am',
    '07 am',
    '08 am',
    '09 am',
    '10 am',
    '11 am',
    '12 pm',
    '01 pm',
    '02 pm',
    '03 pm',
    '04 pm',
    '05 pm',
    '06 pm',
    '07 pm',
    '08 pm',
    '09 pm',
    '10 pm',
    '11 pm',
  ];
  const portugueseHours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '24:00',
  ];

  const onClickMock = jest.fn();
  const id = 'id';
  const label = 'label';
  const value = 'value';
  const placeholder = 'placeholder';
  const className = 'className';
  const errorMessage = 'errorMessage';

  beforeEach(() => {
    renderWithProviders(
      <TimeField
        className={className}
        id={id}
        label={{
          text: label,
          srOnly: false,
        }}
        value={value}
        onClick={onClickMock}
        errorMessage={errorMessage}
        readOnly
        placeholder={placeholder}
      />,
    );
  });

  it('should render input with properties', () => {
    const inputField = screen.getByRole('textbox', { name: id });
    expect(inputField).toBeInTheDocument();
    expect(inputField.id).toBe(id);
    expect(inputField.className).toContain(className);
    expect(inputField).toHaveAttribute('aria-errormessage', errorMessage);
    expect(inputField).toHaveProperty('placeholder', placeholder);
  });
  it('should render readonly input', () => {
    const inputField = screen.getByRole('textbox', { name: id });
    expect(inputField).toHaveAttribute('aria-readonly', 'true');
    expect(inputField).toHaveProperty('readOnly');
  });
  it.each(englishHours)(
    'should call onClick when clicking on input and open dropdown',
    async (englishHour) => {
      const inputField = screen.getByRole('textbox', { name: id });
      await userEvent.click(inputField);

      expect(screen.getByText(englishHour)).toBeInTheDocument();
    },
  );
});
