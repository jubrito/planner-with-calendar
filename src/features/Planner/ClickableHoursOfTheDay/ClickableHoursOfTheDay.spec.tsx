import '@testing-library/jest-dom';
import { act, waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { ClickableHoursOfTheDay } from './ClickableHoursOfTheDay';

describe('ClickableHoursOfTheDay', () => {
  it('should display event details when interacting with the container', async () => {
    const { container } = renderWithProviders(<ClickableHoursOfTheDay />);
    const targetElement = container.firstElementChild;
    expect(targetElement).not.toBe(null);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const positionY = rect.top;
      const mouseDownEvent = new MouseEvent('mousedown', {
        clientY: positionY,
        bubbles: true,
      });
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientY: 49,
        bubbles: true,
      });
      const mouseUpEvent = new MouseEvent('mouseup', {
        clientY: 49,
        bubbles: true,
      });
      act(() => {
        targetElement.dispatchEvent(mouseDownEvent);
      });
      act(() => {
        targetElement.dispatchEvent(mouseMoveEvent);
      });
      act(() => {
        targetElement.dispatchEvent(mouseUpEvent);
      });
      const eventDefaultTitle = '(No title)';
      const eventTime = '12:00 – 01:00 AM';
      await waitFor(() => {
        expect(screen.getByText(eventDefaultTitle)).toBeInTheDocument();
        expect(screen.getByText(eventTime)).toBeInTheDocument();
      });
    }
  });
});
