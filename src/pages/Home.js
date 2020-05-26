import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = ({ user }) => {
  const history = useHistory();
  if (!user) {
    history.push('/signin');
  }
  return <>Yo</>;
};

export default Home;
