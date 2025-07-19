import { render, screen, within } from '@testing-library/react';
import { UpdateCalendarButton } from './UpdateCalendarButton';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('UpdateCalendarButton', () => {
  const updateDateMock = jest.fn();
  const labelMock = 'label-mock';
  const symbolMock = 'symbol-mock';

  it('should display symbol wrapped on button with label provided if symbol exists', () => {
    render(
      <UpdateCalendarButton
        label={labelMock}
        symbol={symbolMock}
        updateDate={updateDateMock}
      />,
    );
    const buttonWithLabel = screen.getByRole('button', { name: labelMock });
    const symbol = within(buttonWithLabel).getByText(symbolMock);
    expect(buttonWithLabel).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
  });

  it('should display icon wrapped on button with label provided if icon exists', () => {
    const iconMock = 'Icon';
    render(
      <UpdateCalendarButton
        label={labelMock}
        icon={<p>{iconMock}</p>}
        updateDate={updateDateMock}
      />,
    );
    const buttonWithLabel = screen.getByRole('button', { name: labelMock });
    const icon = within(buttonWithLabel).getByText(iconMock);
    expect(buttonWithLabel).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('should call updateDate function when clicking on button', async () => {
    render(
      <UpdateCalendarButton label={labelMock} updateDate={updateDateMock} />,
    );
    const buttonWithLabel = screen.getByRole('button', { name: labelMock });
    await userEvent.click(buttonWithLabel);
    expect(updateDateMock).toHaveBeenCalledTimes(1);
  });
});
