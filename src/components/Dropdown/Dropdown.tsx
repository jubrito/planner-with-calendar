import { useState } from 'react';
import { DefaultField } from '../Fields/DefaultField/DefaultField';
import styles from './_dropdown.module.scss';
import { ObjectType, OptionType } from '../../types/types';
import { enterKey } from '../../utils/constants';

type DropdownProps = {
  label: {
    text: string | number;
    srOnly: boolean;
  };
  initialValue: OptionType['content'];
  options: OptionType[];
  onValueUpdate: (valueSelected: OptionType) => void;
  id: string;
  className?: string;
  errorMessage?: string;
  readOnly?: boolean;
  inputStyle?: ObjectType;
  placeholder?: string;
};

export const Dropdown = ({
  initialValue,
  label,
  className,
  onValueUpdate,
  options,
  id,
  errorMessage,
  inputStyle,
  placeholder,
  readOnly = false,
}: DropdownProps) => {
  const [selected, setSelected] = useState<OptionType['content']>(initialValue);
  const [showDropdown, setShowDropdown] = useState<boolean>();

  return (
    <div className={styles.dropdownWrapper}>
      <DefaultField
        id={id}
        className={className}
        value={selected}
        label={label}
        aria-label={id}
        placeholder={placeholder}
        onClick={() => {
          setShowDropdown((prevValue) => !prevValue);
        }}
        onKeyDown={(event) => {
          if (event.key !== enterKey) return;
          setShowDropdown((prevValue) => !prevValue);
        }}
        readOnly={readOnly}
        errorMessage={errorMessage}
        inputStyle={inputStyle}
      />

      {showDropdown && options.length > 0 && (
        <ul role="listbox">
          {options.map((option: OptionType) => {
            return (
              <li
                className={styles.box}
                key={option.key}
                id={option.key.toString()}
                role="option"
                onClick={() => {
                  setSelected(option.content);
                  setShowDropdown(false);
                  onValueUpdate(option);
                }}
              >
                {option.content}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
