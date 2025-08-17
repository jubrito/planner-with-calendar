import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import { LabelField } from './LabelField';
import { render } from '@testing-library/react';

describe('LabelField', () => {
  const label = 'label';
  const htmlFor = 'htmlFor';
  const className = 'className';

  it('should hide label visually but not from screen readers when srOnly (screen readers only) is true', () => {
    render(
      <LabelField
        label={label}
        htmlFor={htmlFor}
        className={className}
        srOnly
      />,
    );
    const labelField = screen.getByText(label);
    expect(labelField).toBeInTheDocument();
    expect(labelField).not.toBeVisible();
    expect(labelField).toHaveAttribute('aria-hidden', 'true');
  });
  it('should display label and make it available to screen readers when srOnly (screen readers only) is false', () => {
    render(
      <LabelField
        label={label}
        htmlFor={htmlFor}
        className={className}
        srOnly={false}
      />,
    );
    const labelField = screen.getByText(label);
    expect(labelField).toBeInTheDocument();
    expect(labelField).toBeVisible();
    expect(labelField).toHaveAttribute('aria-hidden', 'false');
  });
  it('should have label role', () => {
    render(
      <LabelField
        label={label}
        htmlFor={htmlFor}
        className={className}
        srOnly={false}
      />,
    );
    const labelField = screen.getByText(label);
    expect(labelField).toHaveRole('label');
  });
});
