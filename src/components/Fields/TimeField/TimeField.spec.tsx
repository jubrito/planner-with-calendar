import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { TimeField } from './TimeField';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import userEvent from '@testing-library/user-event';
import { initialValue } from '../../../redux/slices/localeSlice';
import {
  hoursIn12HoursFormat,
  hoursIn24HoursFormat,
} from '../../../utils/locale/constants';

describe('TimeField', () => {
  const id = 'id';
  const label = 'label';
  const value = 'value';
  const placeholder = 'placeholder';
  const className = 'className';
  const errorMessage = 'errorMessage';
  const onClickMock = jest.fn();

  describe('WHEN locale is english', () => {
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
    it.each(hoursIn12HoursFormat)(
      'should display all 24 dropdown hours when clicking on input',
      async (englishHour) => {
        const inputField = screen.getByRole('textbox', { name: id });
        await userEvent.click(inputField);

        expect(screen.getByText(englishHour)).toBeInTheDocument();
      },
    );
  });

  describe('WHEN locale is portuguese', () => {
    it.each(hoursIn24HoursFormat)(
      'should display all 24 dropdown hours when clicking on input',
      async (portugueseHour) => {
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
          {
            preloadedState: {
              localeSlice: {
                ...initialValue,
                currentState: {
                  locale: {
                    lang: 'pt-BR',
                  },
                },
              },
            },
          },
        );
        const inputField = screen.getByRole('textbox', { name: id });
        await userEvent.click(inputField);

        expect(screen.getByText(portugueseHour)).toBeInTheDocument();
      },
    );
  });
});
