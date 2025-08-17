import { useState } from 'react';
import sharedStyles from '../../../styles/shared.module.scss';

type DefaultField = {
  className?: string;
  id: string;
  label: {
    text: string;
    srOnly: boolean;
  };
  placeholder?: string;
  value: string;
  readonly?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  errorMessage?: string;
};

export const DefaultField = ({
  errorMessage,
  onChange,
  value,
  className,
  id,
  label,
  placeholder,
  readonly = false,
  onClick,
  ...props
}: DefaultField) => {
  const labelId = `${id}-label`;
  const [inputValue, setInputValue] = useState(value);

  return (
    <>
      <label
        className={label.srOnly ? sharedStyles.srOnly : className}
        id={labelId}
        aria-hidden={label.srOnly}
        hidden={label.srOnly}
        role="label"
      >
        {label?.text}
      </label>
      <input
        className={className}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => {
          onChange(event);
          setInputValue(event.target.value);
        }}
        onClick={onClick}
        aria-errormessage={errorMessage}
        aria-labelledby={labelId}
        aria-readonly={readonly}
        readOnly={readonly}
        {...props}
      />
    </>
  );
};
