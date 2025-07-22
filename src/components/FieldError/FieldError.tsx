import { ObjectType } from '../../types/types';

type FieldErrorProps = { errorMessage: string; style?: ObjectType };

export const FieldError = ({ errorMessage, style }: FieldErrorProps) => {
  return (
    <span
      role="alert"
      aria-atomic="true" // Announce the entire message, not just the changed parts
      aria-live="assertive" // Assistive technology will announce this region's updates
      style={style}
    >
      {errorMessage}
    </span>
  );
};
