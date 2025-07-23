import { FieldError } from '../../../../../../components/FieldError/FieldError';

type DateFieldProps = {
  icon?: React.ReactElement;
  label: {
    dateField: string;
    hourField: string;
  };
  value: {
    dateField: string;
    hourField: number;
  };
  onClick: {
    dateField: () => void;
    hourField: () => void;
  };

  readonly?: boolean;
  errorMessage?: string;
  className: {
    wrapper: string;
    field: string;
  };
};

export const DateField = ({
  icon,
  label,
  value,
  onClick,
  readonly = false,
  errorMessage,
  className,
}: DateFieldProps) => {
  return (
    <div className={className.wrapper}>
      {icon}
      <input
        id={label.dateField}
        aria-label={label.dateField}
        className={className.field}
        value={value.dateField}
        onClick={onClick.dateField}
        aria-readonly={`${readonly}`}
        readOnly={readonly}
        aria-errormessage={errorMessage}
      />
      <input
        id={label.hourField}
        aria-label={label.hourField}
        className={className.field}
        value={value.hourField}
        onClick={onClick.hourField}
        aria-readonly={readonly}
        readOnly={readonly}
        aria-errormessage={errorMessage}
      />
      {errorMessage && <FieldError errorMessage={errorMessage} />}
    </div>
  );
};
