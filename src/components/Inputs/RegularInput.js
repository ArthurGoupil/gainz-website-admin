import React, { useState, useEffect, useRef } from 'react';

import '../../styles/Inputs/RegularInput.css';

const RegularInput = ({
  minWidth,
  label,
  labelStyle,
  placeholder,
  stateValue,
  changeValue,
  isEditing,
  isAnError,
  number,
}) => {
  const sizerRef = useRef();
  const inputId = 'regular-input-id-' + Math.ceil(Math.random() * 1000000000);

  let inputHasReachedMaxLength = stateValue
    ? number
      ? stateValue >= 2000
      : stateValue.length >= 50
    : false;

  // Width of the hidden div that contains stateValue in order to apply it to input
  const [sizerWidth, setSizerWidth] = useState(null);

  useEffect(() => {
    setSizerWidth(sizerRef.current.clientWidth);
  }, [stateValue]);

  return (
    <div className='regular-input-container d-flex align-center'>
      <span style={labelStyle ? labelStyle : { marginRight: '3px' }}>
        {label}
      </span>
      <input
        id={inputId}
        className='main-input'
        disabled={!isEditing ? true : false}
        placeholder={placeholder}
        onChange={(e) => {
          if (
            !stateValue ||
            !inputHasReachedMaxLength ||
            e.nativeEvent.inputType.includes('delete')
          ) {
            if (number) {
              if (!isNaN(e.target.value)) {
                if (e.target.value !== '') {
                  changeValue(Number(e.target.value));
                } else changeValue('');
              }
            } else changeValue(e.target.value);
          }
        }}
        onMouseUp={() => {
          if (window.getSelection().toString().length > 0) {
            inputHasReachedMaxLength = false;
          }
        }}
        autoComplete='none'
        value={stateValue ? stateValue : ''}
      />
      <div
        ref={sizerRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          padding: '5px',
          fontWeight: 'bold',
        }}
      >
        {stateValue}
      </div>
      {sizerWidth && (
        <style>
          {`
          #${inputId} {
            width: ${sizerWidth + 'px'};
            min-width: ${minWidth ? minWidth : 'auto'};
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
          }
        `}
        </style>
      )}
    </div>
  );
};

export default RegularInput;
