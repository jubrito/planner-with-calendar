import { ObjectType } from '../../../types/types';

type ErrorFieldProps = { errorMessage: string; style?: ObjectType };

export const ErrorField = ({ errorMessage, style }: ErrorFieldProps) => {
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
