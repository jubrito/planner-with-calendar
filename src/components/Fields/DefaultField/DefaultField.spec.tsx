import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { initialValue } from '../../../redux/slices/eventSlice';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { DefaultField } from './DefaultField';
import { Months } from '../../../types/calendar/enums';
import { getDateISOString } from '../../../utils/calendar/utils';
import { EventTargeted } from '../../../types/event';

describe('DefaultField', () => {
  const className = 'className';
  const label = 'label';
  const id = 'id';
  const placeholder = 'Add title';
  const value = 'value';
  const errorMessage = 'errorMessage';
  const onChangeMock = jest.fn();

  const eventTitle = 'title';
  const year = 2025;
  const month = Months.FEBRUARY;
  const day = 11;
  const startHour = 1;
  const startMinutes = 59;
  const endHour = 11;
  const endMinutes = 59;
  const startDate = getDateISOString(
    new Date(year, month, day, startHour, startMinutes),
  );
  const endDate = getDateISOString(
    new Date(year, month, day, endHour, endMinutes),
  );
  const initialSelectedEvent: EventTargeted = {
    event: {
      endDate,
      startDate,
      id: 'id',
      title: eventTitle,
    },
    top: 0,
  };

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

    it('should render textbox input with id and classname', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField.id).toBe(id);
      expect(inputField.className).toBe(className);
    });
    it.skip('should render textbox input with placeholder', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toHaveProperty('placeholder', placeholder);
    });
  });

  it.skip('should render textbox input and allow updates', async () => {
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
      {
        preloadedState: {
          eventSlice: {
            ...initialValue,
            currentState: {
              ...initialValue.currentState,
              eventOnUpdateMode: initialSelectedEvent, // opens modal
            },
          },
        },
      },
    );
    const addTitleInput = screen.getByPlaceholderText('Add title');
    expect(addTitleInput).toBeInTheDocument();
    const newEventTitle = 'updated';
    await userEvent.click(addTitleInput);
    await userEvent.type(addTitleInput, newEventTitle);
    expect(
      screen.getByDisplayValue(eventTitle + newEventTitle),
    ).toBeInTheDocument();
  });
});
