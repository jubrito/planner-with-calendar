import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FieldError } from './FieldError';

describe('FieldError', () => {
  it('should display error message', () => {
    render(<FieldError errorMessage="Error message" />);
    const errorField = screen.getByText('Error message');
    expect(errorField).toBeInTheDocument();
  });
  it('should render field with accessibility attributes', () => {
    render(<FieldError errorMessage="Error message" />);
    const errorField = screen.getByText('Error message');
    expect(errorField).toHaveRole('alert');
    expect(errorField).toHaveAttribute('aria-atomic', 'true');
    expect(errorField).toHaveAttribute('aria-live', 'assertive');
  });
});
