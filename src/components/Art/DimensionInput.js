import React, { useEffect, useRef } from 'react';

const DimensionInput = ({
  label,
  labelStyle,
  value,
  changeValue,
  isEditing,
  unit,
  isCanceling,
  isAnError,
}) => {
  const dimensionInputRef = useRef();
  const inputId = 'dimension-input-id-' + Math.ceil(Math.random() * 1000000000);

  useEffect(() => {
    if (dimensionInputRef.current) {
      dimensionInputRef.current.textContent = value;
    }
  }, [isCanceling, value]);

  return (
    <div className='dimension-input-container d-flex align-center'>
      <span style={labelStyle ? labelStyle : { marginRight: '3px' }}>
        {label}
      </span>
      <div style={{ position: 'relative' }} className='d-flex align-center'>
        <span
          id={inputId}
          ref={dimensionInputRef}
          className='input dimension d-flex align-center'
          contentEditable={isEditing ? true : false}
          suppressContentEditableWarning={true}
          onInput={(e) => {
            changeValue(Number(e.currentTarget.textContent));
          }}
        >
          {value}
        </span>
        <span className='cm-dimension' contentEditable={false}>
          {unit}
        </span>
      </div>
      <style>
        {`
          #${inputId} {
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
          }
        `}
      </style>
    </div>
  );
};

export default DimensionInput;
