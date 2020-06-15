import React, { useState, useEffect, useRef } from 'react';

import '../../styles/Inputs/DimensionInput.css';

const DimensionInput = ({
  minWidth,
  label,
  labelStyle,
  stateValue,
  changeValue,
  isEditing,
  unit,
  isAnError,
}) => {
  const sizerRef = useRef();
  const inputId = 'dimension-input-id-' + Math.ceil(Math.random() * 1000000000);

  // Width of the hidden div that contains stateValue in order to apply it to input
  const [sizerWidth, setSizerWidth] = useState(null);

  useEffect(() => {
    setSizerWidth(sizerRef.current.clientWidth);
  }, [stateValue]);

  return (
    <div className='dimension-input-container d-flex align-center'>
      <span
        style={
          labelStyle ? labelStyle : { marginRight: '3px', lineHeight: '2rem' }
        }
      >
        {label}
      </span>
      <div style={{ position: 'relative' }} className='d-flex align-center'>
        <input
          id={inputId}
          className='main-input'
          disabled={!isEditing ? true : false}
          onChange={(e) => {
            if (e.target.value < 10000)
              if (!isNaN(e.target.value)) {
                if (e.target.value !== '') {
                  changeValue(Number(e.target.value));
                } else changeValue('');
              }
          }}
          autoComplete='none'
          value={stateValue ? stateValue : ''}
        />
        <span className='cm-dimension' contentEditable={false}>
          {unit}
        </span>
      </div>
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
            width: ${sizerWidth + 24 + 'px'};
            min-width: ${minWidth ? minWidth : 'auto'};
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
            padding-right: 24px;
          }
        `}
        </style>
      )}
    </div>
  );
};

export default DimensionInput;
