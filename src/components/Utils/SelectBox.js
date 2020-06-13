import React from 'react';

import '../../styles/Utils/SelectBox.css';

const SelectBox = ({ label, labelStyle, selected, onClick }) => {
  return (
    <div
      className='d-flex align-center'
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className='select-box-border d-flex justify-center align-center'>
        {selected && <div className='select-box-selected'></div>}
      </div>
      <span style={labelStyle}>{label}</span>
    </div>
  );
};

export default SelectBox;
