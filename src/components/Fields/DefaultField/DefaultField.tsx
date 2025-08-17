import { useEffect, useState } from 'react';
import sharedStyles from '../../../styles/shared.module.scss';
import { LabelField } from '../LabelField/LabelField';

type DefaultField = {
  className?: string;
  id: string;
  label: {
    text: string | number;
    srOnly: boolean;
  };
  placeholder?: string;
  value: string | number;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  errorMessage?: string;
};

export const DefaultField = ({
  errorMessage,
  onChange,
  onKeyDown,
  onClick,
  value,
  className,
  id,
  label,
  placeholder,
  readOnly = false,
  ...props
}: DefaultField) => {
  const inputId = id.replace(' ', '-');
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const onlyUpdatesBasedOnProps = !readOnly || value === inputValue;
    if (onlyUpdatesBasedOnProps) return;
    setInputValue(value);
  }, [readOnly, value, inputValue]);

  return (
    <>
      <LabelField
        htmlFor={inputId}
        aria-hidden={label.srOnly}
        srOnly={label.srOnly}
        className={label.srOnly ? sharedStyles.srOnly : className}
        label={label.text}
      />
      <input
        className={className}
        id={inputId}
        placeholder={placeholder}
        value={inputValue}
        onChange={(event) => {
          if (!onChange || readOnly) return;
          onChange(event);
          setInputValue(event.target.value);
        }}
        onClick={onClick}
        onKeyDown={onKeyDown}
        aria-errormessage={errorMessage}
        aria-readonly={readOnly}
        readOnly={readOnly}
        {...props}
      />
    </>
  );
};
