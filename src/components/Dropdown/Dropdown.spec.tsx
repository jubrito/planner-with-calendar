import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { Dropdown } from './Dropdown';
import { render } from '@testing-library/react';
/**
 * Expected behaviour
The expected behaviour of the dropdown is as follows for mouse users:

When I click on the collapsed element, I should expect the dropdown to appear.
When dropdown is visible, I should be able to select an option by clicking on a list item
When an item is selected, the dropdown should collapse and the selected item should appear in the collapsed box.
If the dropdown is visible and I click anywhere outside the list items, the dropdown should collapse
If no option is selected an error message should appear
The expected behaviour for keyboard users:

The element should be reached by tabbing (pressing the tab key until I reach the element)
When the element received focus and I use the UP/DOWN arrows, I should be able to cycle through the options.
When cycling through the options using the UP/DOWN arrows, the option should be selected automatically
If press the SPACE bar, the dropdown should appear. If I press the SPACE bar again or the esc key, the dropdown should collapse.
When dropdown is open, I should be able to cycle through the options by pressing the UP/DOWN arrows.
I can select an option by pressing the SPACE bar.
When an option is selected, the dropdown should collapse.
If an option is selected and I open the dropdown by pressing the SPACE bar, the selected option should receive focus. When I cycle through the options again, focus moves to the next respected option. I can then press the SPACE bar to select the focused option and dropdown collapses.
If no option is selected an error message should appear.
Expected behaviour for screen readers:

When I tab to the element I should hear its purpose clear and identifies as combobox
When the dropdown opens I should hear its opened state
When I cycle through the options I should her the options clear
When I select an option I should hear the respected option has been selected.
When I close the dropdown I should hear the closed state
If no option is selected and the dropdown has been closed, I should hear an error message.
 */

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
});
