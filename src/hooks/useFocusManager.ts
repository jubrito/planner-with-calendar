import { useRef, useCallback } from 'react';

export function useFocusManager<T extends HTMLElement>(
  activeElement: Element | null,
) {
  const lastActiveElement = useRef<HTMLElement>(null);
  const elementRef = useRef<T>(null);

  const focusFirstElement = useCallback(() => {
    if (elementRef.current == null) return;

    const focusableElements = elementRef.current.querySelectorAll(
      'button, [href], input, select, textarea',
    );

    if (focusableElements.length > 0) {
      const [firstElement] = focusableElements;
      if (firstElement instanceof HTMLElement) {
        firstElement.focus();
      }
    }
  }, []);

  const setupFocusTrap = useCallback(() => {
    // Store the element that had focus before element opened to focus it back when it closes
    lastActiveElement.current = activeElement as HTMLElement;
    focusFirstElement();
  }, [activeElement, focusFirstElement]);

  const returnFocusToInitialElement = () => {
    lastActiveElement.current?.focus();
    lastActiveElement.current = null;
  };

  return {
    elementRef,
    setupFocusTrap,
    returnFocusToInitialElement,
  };
}
