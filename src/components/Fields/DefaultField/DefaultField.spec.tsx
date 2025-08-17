import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { DefaultField } from './DefaultField';

describe('DefaultField', () => {
  const className = 'className';
  const label = 'label';
  const id = 'id';
  const placeholder = 'Add title';
  const value = 'value';
  const errorMessage = 'errorMessage';
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();

  describe('Rendering', () => {
    beforeEach(() => {
      renderWithProviders(
        <DefaultField
          className={className}
          label={{
            text: label,
            srOnly: false,
          }}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChangeMock}
          errorMessage={errorMessage}
        />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
      jest.restoreAllMocks();
    });

    it('should render textbox input with id and classname', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField.id).toBe(id);
      expect(inputField.className).toBe(className);
    });
    it('should render textbox input with placeholder', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toHaveProperty('placeholder', placeholder);
    });
    it('should render textbox input with value', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toHaveValue(value);
    });
    it('should render textbox input with value', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toHaveValue(value);
    });
    it('should render textbox input labelled by label', () => {
      const inputField = screen.getByRole('textbox');
      const labelField = screen.getByRole('label');
      expect(labelField.id).toBe(`${id}-label`);
      expect(inputField).toHaveAttribute('aria-labelledby', labelField.id);
    });
    it('should display label and make it available to screen readers when srOnly (screen readers only) is false', () => {
      const labelField = screen.getByText(label);
      expect(labelField).toBeInTheDocument();
      expect(labelField).toBeVisible();
      expect(labelField).toHaveAttribute('aria-hidden', 'false');
    });
    it('should not render textbox input with read only properties', async () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).not.toHaveAttribute('readonly');
      expect(inputField).toHaveAttribute('aria-readonly', 'false');
    });
    it('should render textbox input with aria error message', async () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toHaveAttribute('aria-errormessage', errorMessage);
    });
  });

  describe('Field updates', () => {
    beforeEach(() => {
      renderWithProviders(
        <DefaultField
          className={className}
          label={{
            text: label,
            srOnly: false,
          }}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChangeMock}
          onClick={onClickMock}
          errorMessage={errorMessage}
        />,
      );
    });
    it('should call textbox input on change', async () => {
      const inputField = screen.getByRole('textbox');

      await userEvent.click(inputField);
      await userEvent.type(inputField, '!');

      expect(onChangeMock).toHaveBeenCalled();
    });
    it('should call textbox input on click', async () => {
      const inputField = screen.getByRole('textbox');

      await userEvent.click(inputField);
      await userEvent.type(inputField, '!');

      expect(onClickMock).toHaveBeenCalled();
    });
    it('should allow textbox input updates', async () => {
      const inputField = screen.getByRole('textbox');
      const newValue = 'updated';

      await userEvent.click(inputField);
      await userEvent.type(inputField, newValue);

      expect(screen.getByDisplayValue(value + newValue)).toBeInTheDocument();
    });
    it('should allow textbox input updates', async () => {
      const inputField = screen.getByRole('textbox');
      const newValue = 'updated';

      await userEvent.click(inputField);
      await userEvent.type(inputField, newValue);

      expect(screen.getByDisplayValue(value + newValue)).toBeInTheDocument();
    });
  });

  it('should hide label visually but not from screen readers when srOnly (screen readers only) is true', () => {
    renderWithProviders(
      <DefaultField
        className={className}
        label={{
          text: label,
          srOnly: true,
        }}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        errorMessage={errorMessage}
      />,
    );
    const labelField = screen.getByText(label);
    expect(labelField).toBeInTheDocument();
    expect(labelField).not.toBeVisible();
    expect(labelField).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render textbox input with read only properties', async () => {
    renderWithProviders(
      <DefaultField
        className={className}
        label={{
          text: label,
          srOnly: false,
        }}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChangeMock}
        errorMessage={errorMessage}
        readonly
      />,
    );
    const inputField = screen.getByRole('textbox');
    expect(inputField).toHaveAttribute('readonly');
    expect(inputField).toHaveAttribute('aria-readonly', 'true');
  });
});
