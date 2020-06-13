import React from 'react';
import { useHistory } from 'react-router-dom';

import '../../styles/Utils/BackButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ artType }) => {
  const history = useHistory();

  return (
    <div
      className='back-icon-container'
      onClick={() => history.push(`/${artType}`)}
    >
      <FontAwesomeIcon icon='arrow-left' />
    </div>
  );
};

export default BackButton;
