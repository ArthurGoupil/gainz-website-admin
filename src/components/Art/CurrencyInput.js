import React, { useEffect, useRef } from 'react';

const CurrencyInput = ({
  width,
  label,
  labelStyle,
  value,
  stateValue,
  changeValue,
  isEditing,
  currency,
  isCanceling,
  disabled,
  isAnError,
}) => {
  const currencyInputRef = useRef();
  const inputId = 'currency-input-id-' + Math.ceil(Math.random() * 1000000000);
  const euroCurrencyId =
    'euro-currency-id-' + Math.ceil(Math.random() * 1000000000);

  useEffect(() => {
    if (isNaN(stateValue)) {
      changeValue(value);
      currencyInputRef.current.textContent = value;
    } else currencyInputRef.current.textContent = stateValue;
  }, [stateValue]);

  useEffect(() => {
    if (currencyInputRef.current) {
      currencyInputRef.current.textContent = value;
    }
  }, [isCanceling, value]);

  return (
    <div className='currency-input-container d-flex align-center'>
      <span style={labelStyle ? labelStyle : { marginRight: '3px' }}>
        {label && <>{label}&#160;</>}
      </span>
      <div style={{ position: 'relative' }} className='d-flex align-center'>
        <span
          id={inputId}
          ref={currencyInputRef}
          className='input'
          style={{ paddingRight: '16px' }}
          contentEditable={isEditing && !disabled ? true : false}
          suppressContentEditableWarning={true}
          onInput={(e) => {
            Array.prototype.slice
              .call(currencyInputRef.current.children)
              .forEach((item) => {
                item.remove();
              });

            if (e.currentTarget.textContent === '') changeValue('');
            else changeValue(Number(e.currentTarget.textContent));
          }}
        >
          {value}
        </span>
        <span
          id={euroCurrencyId}
          className='euro-currency'
          contentEditable={false}
        >
          {currency}
        </span>
      </div>
      <style>
        {`
          #${inputId} {
            min-width: ${width ? width : 'auto'};
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            line-height: 2.5rem;
            text-align: right;
            cursor: ${disabled ? 'not-allowed' : 'auto'};
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
          }

          #${inputId}, #${euroCurrencyId} {
            opacity: ${disabled ? 0.3 : 1};
            transition: opacity 0.5s;
          }
        `}
      </style>
    </div>
  );
};

export default CurrencyInput;
