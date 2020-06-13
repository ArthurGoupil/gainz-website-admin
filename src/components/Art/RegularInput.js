import React, { useEffect, useRef } from 'react';

const RegularInput = ({
  width,
  label,
  labelStyle,
  placeholder,
  value,
  stateValue,
  changeValue,
  isEditing,
  number,
  isCanceling,
  isAnError,
}) => {
  const regularInputRef = useRef();
  const inputId = 'regular-input-id-' + Math.ceil(Math.random() * 1000000000);

  useEffect(() => {
    if (number) {
      if (isNaN(stateValue)) {
        changeValue(value);
        regularInputRef.current.textContent = value;
      } else regularInputRef.current.textContent = stateValue;
    }
  }, [stateValue]);

  useEffect(() => {
    if (regularInputRef.current) {
      regularInputRef.current.textContent = value;
    }
  }, [isCanceling, value]);

  return (
    <div className='regular-input-container d-flex align-center'>
      <span style={labelStyle ? labelStyle : { marginRight: '3px' }}>
        {label}
      </span>
      <span
        id={inputId}
        ref={regularInputRef}
        className='input d-flex align-center'
        contentEditable={isEditing ? true : false}
        suppressContentEditableWarning={true}
        onInput={(e) => {
          // Removing potential div created by 'Enter' key
          Array.prototype.slice
            .call(regularInputRef.current.children)
            .forEach((item) => {
              item.remove();
            });

          const value = number
            ? Number(e.currentTarget.textContent)
            : e.currentTarget.textContent;
          changeValue(value);
        }}
      >
        {value}
      </span>
      <style>
        {`
          #${inputId} {
            min-width: ${width ? width : 'auto'};
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
          }

          #${inputId}:empty:before{
            content: '${placeholder ? placeholder : ''}';
            color:grey;
            font-style:italic;
            font-weight: normal;
            pointer-events: none;
          }

        `}
      </style>
    </div>
  );
};

export default RegularInput;
