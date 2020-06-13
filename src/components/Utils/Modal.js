import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/Utils/Modal.css';

const Modal = ({
  icon,
  iconColor,
  question,
  posLabel,
  negLabel,
  onPosClick,
  onNegClick,
  displayModal,
  setDisplayModal,
}) => {
  return (
    <div
      className='modal-container d-flex justify-center align-center'
      onClick={(e) => {
        if (e.target.className.includes('modal-container'))
          setDisplayModal(false);
      }}
    >
      <div className='modal d-flex flex-column align-center space-around'>
        <div style={{ color: iconColor, fontSize: '3rem' }}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>
          {question}
        </div>
        <div>
          <button
            className='button'
            style={{ marginRight: '10px' }}
            onClick={onPosClick}
          >
            {posLabel}
          </button>
          <button className='button delete-button' onClick={onNegClick}>
            {negLabel}
          </button>
        </div>
      </div>
      <style>
        {`
        .modal-container {
          opacity: ${displayModal ? 1 : 0};
          pointer-events: ${displayModal ? 'auto' : 'none'};
          transition: opacity 0.3s;
        }
        `}
      </style>
    </div>
  );
};

export default Modal;
