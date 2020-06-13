import React, { useEffect, useRef } from 'react';

const TitleInput = ({
  label,
  value,
  changeValue,
  isEditing,
  number,
  isCanceling,
}) => {
  const titleInputRef = useRef();
  const inputId = 'title-input-id-' + Math.ceil(Math.random() * 1000000000);

  useEffect(() => {
    if (titleInputRef.current && titleInputRef.current.textContent !== value) {
      titleInputRef.current.textContent = value;
    }
  }, [isCanceling, value]);

  return (
    <div className='title-input-container d-flex align-center'>
      {label}&#160;
      <span
        id={inputId}
        ref={titleInputRef}
        className='input title-input art-title'
        contentEditable={isEditing ? true : false}
        suppressContentEditableWarning={true}
        onInput={(e) => {
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
            background-color: ${
              isEditing ? 'rgb(242, 247, 250)' : 'rgb(255, 255, 255)'
            };
            height: auto;
          }
        `}
      </style>
    </div>
  );
};

export default TitleInput;
