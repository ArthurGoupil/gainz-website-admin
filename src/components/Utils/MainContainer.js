import React from 'react';

import '../../styles/Utils/MainContainer.css';

const MainContainer = ({ children, flexBox }) => {
  return (
    <div className={`main-container ${flexBox ? flexBox : ''}`}>{children}</div>
  );
};

export default MainContainer;
