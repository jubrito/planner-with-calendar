import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it('should display error message received', () => {
    const error = new Error('error');
    render(<ErrorFallback error={error} />);
    const errorDefaultText = screen.getByText('Something went wrong:');
    const errorText = screen.getByText(error.message);
    expect(errorDefaultText).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });
});
