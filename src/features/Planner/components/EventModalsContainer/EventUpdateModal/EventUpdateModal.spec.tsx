import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('EventUpdateModal', () => {
  it.skip('should render title input', () => {
    const addTitleInput = screen.getByText('Add title');
    const newEventTitle = 'New event title';
    expect(addTitleInput).toBeInTheDocument();
    userEvent.click(addTitleInput);
    userEvent.type(addTitleInput, newEventTitle);
    expect(screen.getByAltText(newEventTitle)).toBeInTheDocument();
  });
  it.todo('should render date input');
  it.todo('should render hour range inputs');
  it.todo('should render date checkbox');
  it.todo('should render recurrence dropdown');
  it.todo('should render description input');
  it.todo('should render alerts');
});
