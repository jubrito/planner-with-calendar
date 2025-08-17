import sharedStyles from '../../../styles/shared.module.scss';

type LabelFieldProps = {
  label: string;
  htmlFor: string;
  srOnly?: boolean;
  className: string;
};

export const LabelField = ({
  htmlFor,
  label,
  className,
  srOnly = false,
  ...props
}: LabelFieldProps) => {
  return (
    <label
      className={srOnly ? sharedStyles.srOnly : className}
      htmlFor={htmlFor}
      aria-hidden={srOnly}
      hidden={srOnly}
      role="label"
      {...props}
    >
      {label}
    </label>
  );
};
