import '@testing-library/jest-dom';
import { act, waitFor, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../utils/tests/renderWithProviders';
import { ClickableHoursOfTheDay } from './ClickableHoursOfTheDay';

describe('ClickableHoursOfTheDay', () => {
  it('should display event details when interacting with the visible portion of the container', async () => {
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
  it('should display event details when interacting with the not visible portion of the container', async () => {
    const { container } = renderWithProviders(<ClickableHoursOfTheDay />);
    const targetElement = container.firstElementChild;
    expect(targetElement).not.toBe(null);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const positionY = rect.top;
      const mouseDownEvent = new MouseEvent('mousedown', {
        clientY: positionY + 525,
        bubbles: true,
      });
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientY: positionY + 625,
        bubbles: true,
      });
      const mouseUpEvent = new MouseEvent('mouseup', {
        clientY: positionY + 625,
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
      const eventTime = '10:30 AM – 12:45 PM';
      await waitFor(() => {
        expect(screen.getByText(eventDefaultTitle)).toBeInTheDocument();
        expect(screen.getByText(eventTime)).toBeInTheDocument();
      });
    }
  });
});
