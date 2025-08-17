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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
        aria-errormessage={errorMessage}
        aria-labelledby={labelId}
        {...props}
      />
    </>
  );
};
