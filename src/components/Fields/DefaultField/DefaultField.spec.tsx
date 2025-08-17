import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { DefaultField } from './DefaultField';
import { enterKey } from '../../../utils/constants';

describe('DefaultField', () => {
  const className = 'className';
  const label = 'label';
  const id = 'id';
  const placeholder = 'Add title';
  const value = 'value';
  const errorMessage = 'errorMessage';
  const onChangeMock = jest.fn();
  const onClickMock = jest.fn();
  const onKeyDownMock = jest.fn();

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
    it('should render label for textbox input', () => {
      const inputField = screen.getByRole('textbox');
      const labelField = screen.getByRole('label');
      expect(labelField).toHaveProperty('htmlFor', inputField.id);
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
          onKeyDown={onKeyDownMock}
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
    it('should call textbox input on keydown', () => {
      const inputField = screen.getByRole('textbox');

      fireEvent.keyDown(inputField, { key: enterKey });

      expect(onKeyDownMock).toHaveBeenCalled();
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

  describe('When it is readonly', () => {
    let rerenderDefaultField: (ui: React.ReactNode) => void;
    beforeEach(() => {
      const { rerender } = renderWithProviders(
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
          readOnly
        />,
      );
      rerenderDefaultField = rerender;
    });
    it('should render textbox input with read only properties', async () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toHaveAttribute('readonly');
      expect(inputField).toHaveAttribute('aria-readonly', 'true');
    });
    it('should set textbox input value based on props', async () => {
      const inputField = screen.getByRole('textbox');
      const newValue = 'updated';

      await userEvent.click(inputField);
      await userEvent.type(inputField, newValue);

      expect(screen.queryByDisplayValue(value)).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue(value + newValue),
      ).not.toBeInTheDocument();

      const newPropsValue = 'newPropsValue';

      rerenderDefaultField(
        <DefaultField
          className={className}
          label={{
            text: label,
            srOnly: false,
          }}
          id={id}
          placeholder={placeholder}
          value={newPropsValue}
          onChange={onChangeMock}
          errorMessage={errorMessage}
          readOnly
        />,
      );
      expect(screen.queryByDisplayValue(newPropsValue)).toBeInTheDocument();
    });
  });
});
