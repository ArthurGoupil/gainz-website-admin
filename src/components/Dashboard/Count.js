import React from 'react';

import CountUp from 'react-countup';

import '../../styles/Dashboard/Count.css';

const Count = ({ number, unit, label }) => {
  return (
    <div className='d-flex flex-column align-center justify-center'>
      <span className='count d-flex align-center'>
        <CountUp end={number} duration={1} />
        {unit && <>&nbsp;{unit}</>}
      </span>
      <span>{label}</span>
    </div>
  );
};

export default Count;
