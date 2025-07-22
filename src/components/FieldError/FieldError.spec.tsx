import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FieldError } from './FieldError';

describe('FieldError', () => {
  it('should display error message', () => {
    render(<FieldError errorMessage="Error message" />);
    const errorField = screen.getByText('Error message');
    expect(errorField).toBeInTheDocument();
  });
});
