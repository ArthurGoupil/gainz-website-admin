import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Papers = ({ user }) => {
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
  }, [user, history]);

  return <>yi</>;
};

export default Papers;
