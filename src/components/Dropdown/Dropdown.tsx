import { useCallback, useEffect, useRef, useState } from 'react';
import { DefaultField } from '../Fields/DefaultField/DefaultField';
import styles from './_dropdown.module.scss';
import { ObjectType, OptionType } from '../../types/types';
import { enterKey, spaceKey } from '../../utils/constants';

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
  maxHeight?: string;
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
  maxHeight,
  readOnly = false,
}: DropdownProps) => {
  const [selected, setSelected] = useState<OptionType['content']>(initialValue);
  const [showDropdown, setShowDropdown] = useState<boolean>();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const selectedValue = options.find(
    (option) => option.content.toString() === selected.toString(),
  );

  const findElementToFocus = useCallback(() => {
    if (!dropdownRef.current) return;
    const dropdownOptions = Array.from(
      dropdownRef.current?.querySelectorAll('li'),
    );
    if (dropdownOptions.length < 1) return;

    if (!selectedValue) {
      const [firstListItemElement] = dropdownOptions;
      firstListItemElement.focus();
      return;
    }

    const selectedOption = dropdownOptions.find(
      (listItemElement) =>
        listItemElement.textContent === selectedValue.content,
    );

    if (!selectedOption) return;

    selectedOption?.focus();
  }, [selectedValue]);

  const maintainFocusOnSelectedItem = (e: React.MouseEvent) => {
    const isClickingOnDropdown = e.target === dropdownRef.current;
    if (isClickingOnDropdown) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    findElementToFocus();
  }, [selected, findElementToFocus, showDropdown]);

  return (
    <div className={styles.dropdownWrapper}>
      <DefaultField
        id={id}
        className={
          showDropdown ? `${className} ${styles.line} juju` : className
        }
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
        <ul
          role="listbox"
          ref={dropdownRef}
          style={{ maxHeight }}
          onMouseDown={maintainFocusOnSelectedItem}
        >
          {options.map((option: OptionType) => {
            return (
              <li
                key={getIdentifier(option)}
                id={getIdentifier(option)}
                role="option"
                onClick={() => {
                  setSelected(option.content);
                  setShowDropdown(false);
                  onValueUpdate(option);
                }}
                onKeyDown={(event) => {
                  if (!(event.key === enterKey) && !(event.code === spaceKey))
                    return;
                  setSelected(option.content);
                  setShowDropdown(false);
                  onValueUpdate(option);
                }}
                tabIndex={0}
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

const getIdentifier = (option: OptionType) =>
  `${option.key.toString()}-${option.content}`.replace(' ', '');
