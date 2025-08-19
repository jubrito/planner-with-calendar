import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/dom';
import { Dropdown } from './Dropdown';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { enterKey } from '../../utils/constants';

describe('Dropdown', () => {
  const label = 'label';
  const initialValue = 'initialValue';
  const className = 'className';
  const errorMessage = 'errorMessage';
  const id = 'id';
  const onValueUpdateMock = jest.fn();
  const options = [
    { key: 1, content: '1' },
    { key: 2, content: '2' },
  ];

  beforeEach(() => {
    render(
      <Dropdown
        label={{
          text: label,
          srOnly: false,
        }}
        className={className}
        errorMessage={errorMessage}
        initialValue={initialValue}
        options={options}
        onValueUpdate={onValueUpdateMock}
        id={id}
      />,
    );
  });

  it('should render input field', () => {
    const inputField = screen.getByRole('textbox', { name: id });
    expect(inputField).toBeInTheDocument();
  });
  it('should render input with class and id', () => {
    const inputField = screen.getByRole('textbox', { name: id });
    expect(inputField.id).toBe(id);
    expect(inputField.className).toContain(className);
  });
  it('should render input with received error message', () => {
    const inputField = screen.getByRole('textbox', { name: id });
    expect(inputField).toHaveAttribute('aria-errormessage', errorMessage);
  });
  it('should render input label', () => {
    const labelField = screen.getByRole('label', { name: label });
    expect(labelField).toBeInTheDocument();
  });
  it('should render input with initial value', () => {
    const inputField = screen.getByRole('textbox', { name: id });
    expect(inputField).toHaveDisplayValue(initialValue);
  });
  it.each(options)(
    'should open dropdown and display options when clicking on input (mouse)',
    async (option) => {
      const inputField = screen.getByRole('textbox', { name: id });
      await userEvent.click(inputField);

      expect(screen.getByText(option.content)).toBeInTheDocument();
    },
  );
  it.each(options)(
    'should open dropdown and display options when clicking on input (enter key)',
    async (option) => {
      const inputField = screen.getByRole('textbox', { name: id });
      fireEvent.keyDown(inputField, { key: enterKey });

      expect(screen.getByText(option.content)).toBeInTheDocument();
    },
  );
  it.todo('should select and focus item if input option exists on dropdown');
  it.todo('should select and focus item when clicking on a list item (mouse)');
  it.todo(
    'should select and focus item when clicking on a list item (enter and space keys)',
  );
  it.todo('should select and focus item when using tab key');
  it.todo('should close dropdown when clicking on a list item');
  it.todo('should close dropdown when clicking outside the dropdown');
  it.todo('should close dropdown when pressing the esc key');
  it.todo('should access element using the tab key');
  it.todo('should access element using the tab key');
});
