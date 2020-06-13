import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/Utils/Checkbox.css';

const Checkbox = ({
  label,
  labelStyle,
  checked,
  setChecked,
  isEditing,
  isCanceling,
}) => {
  useEffect(() => {
    setChecked(checked);
  }, [isCanceling, checked, setChecked]);
  const inputId = 'checkbox-input-id-' + Math.ceil(Math.random() * 1000000000);
  const inputLabelId =
    'checkbox-labe-input-id-' + Math.ceil(Math.random() * 1000000000);

  return (
    <div
      className='d-flex align-center'
      style={{ cursor: isEditing ? 'pointer' : 'not-allowed' }}
      onClick={() => isEditing && setChecked(!checked)}
    >
      <span
        id={inputLabelId}
        style={labelStyle ? labelStyle : { marginRight: '8px' }}
      >
        {label}
      </span>
      <div
        id={inputId}
        className='checkbox-container d-flex justify-center align-center'
      >
        <div className='checked-icon'>
          <FontAwesomeIcon icon='check' />
        </div>
      </div>
      <style>
        {`
        #${inputId} {
          background-color: ${checked ? 'var(--darkBlue)' : 'transparent'};
        }
        #${inputLabelId} {
          user-select: none;
        }
        `}
      </style>
    </div>
  );
};

export default Checkbox;
