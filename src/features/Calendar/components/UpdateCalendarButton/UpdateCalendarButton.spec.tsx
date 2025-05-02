import { render, screen, within } from '@testing-library/react';
import { UpdateCalendarButton } from './UpdateCalendarButton';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('UpdateCalendarButton', () => {
  const updateDateMock = jest.fn();
  const labelMock = 'label-mock';
  const symbolMock = 'symbol-mock';

  beforeEach(() => {
    render(
      <UpdateCalendarButton
        label={labelMock}
        symbol={symbolMock}
        updateDate={updateDateMock}
      />,
    );
  });

  it('should display symbol wrapped on button with label provided', () => {
    const buttonWithLabel = screen.getByRole('button', { name: labelMock });
    const symbol = within(buttonWithLabel).getByText(symbolMock);
    expect(buttonWithLabel).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
  });

  it('should call updateDate function when clicking on button', async () => {
    const buttonWithLabel = screen.getByRole('button', { name: labelMock });
    await userEvent.click(buttonWithLabel);
    expect(updateDateMock).toHaveBeenCalledTimes(1);
  });
});
