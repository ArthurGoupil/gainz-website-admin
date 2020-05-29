import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Paintings = ({ user }) => {
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user, history]);

  return <>ya</>;
};

export default Paintings;
