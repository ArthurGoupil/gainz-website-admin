import React, { useState, useEffect, useRef } from 'react';

import '../../styles/Inputs/CurrencyInput.css';

const CurrencyInput = ({
  minWidth,
  label,
  labelStyle,
  stateValue,
  changeValue,
  isEditing,
  currency,
  disabled,
  isAnError,
}) => {
  const sizerRef = useRef();
  const inputId = 'currency-input-id-' + Math.ceil(Math.random() * 1000000000);
  const euroCurrencyId =
    'euro-currency-id-' + Math.ceil(Math.random() * 1000000000);

  // Width of the hidden div that contains stateValue in order to apply it to input
  const [sizerWidth, setSizerWidth] = useState(null);

  useEffect(() => {
    setSizerWidth(sizerRef.current.clientWidth);
  }, [stateValue]);

  return (
    <div className='currency-input-container d-flex align-center'>
      <span style={labelStyle ? labelStyle : { marginRight: '3px' }}>
        {label && <>{label}&#160;</>}
      </span>
      <div style={{ position: 'relative' }} className='d-flex align-center'>
        <input
          id={inputId}
          className='main-input'
          disabled={!isEditing || disabled ? true : false}
          onChange={(e) => {
            if (e.target.value < 1000000000)
              if (!isNaN(e.target.value)) {
                if (e.target.value !== '') {
                  changeValue(Number(e.target.value));
                } else changeValue('');
              }
          }}
          autoComplete='none'
          value={stateValue || stateValue === 0 ? stateValue : ''}
        />

        <span
          id={euroCurrencyId}
          className='euro-currency'
          contentEditable={false}
        >
          {currency}
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
            width: ${sizerWidth + 15 + 'px'};
            min-width: ${minWidth ? minWidth : 'auto'};            
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            line-height: 2.5rem;
            text-align: right;
            cursor: ${disabled ? 'not-allowed' : 'auto'};
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
            padding-right: 18px;
          }

          #${inputId}, #${euroCurrencyId} {
            opacity: ${disabled ? 0.4 : 1};
            transition: opacity 0.5s;
          }
        `}
        </style>
      )}
    </div>
  );
};

export default CurrencyInput;
