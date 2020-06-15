import React, { useState, useEffect, useRef } from 'react';

import '../../styles/Inputs/TitleInput.css';

const TitleInput = ({
  label,
  stateValue,
  changeValue,
  isEditing,
  isAnError,
}) => {
  const sizerRef = useRef();
  const inputId = 'title-input-id-' + Math.ceil(Math.random() * 1000000000);

  // Width of the hidden div that contains stateValue in order to apply it to input
  const [sizerWidth, setSizerWidth] = useState(null);

  useEffect(() => {
    if (sizerRef.current) setSizerWidth(sizerRef.current.clientWidth);
  }, [stateValue]);

  return (
    <div className='title-input-container d-flex align-center'>
      {label}&#160;
      <input
        id={inputId}
        className='main-input title-input art-title'
        disabled={!isEditing ? true : false}
        onChange={(e) => {
          if (
            stateValue === null ||
            stateValue.length < 50 ||
            e.nativeEvent.inputType === 'deleteContentBackward'
          ) {
            changeValue(e.target.value);
          }
        }}
        autoComplete='none'
        value={stateValue}
      />
      <div
        ref={sizerRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          padding: '5px',
          fontSize: '3rem',
          lineHeight: '3rem',
          fontWeight: 'bold',
          padding: '10px',
        }}
      >
        {stateValue}
      </div>
      <style>
        {`
          #${inputId} {
            width: ${sizerWidth + 'px'};
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            height: auto;
            border: ${isAnError ? 'solid 2px var(--red)' : 'none'};
            outline-color: ${isAnError && 'var(--red)'};
          }
        `}
      </style>
    </div>
  );
};

export default TitleInput;
