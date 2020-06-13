import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Paintings from '../pages/Paintings';
import Papers from '../pages/Papers';
import Art from '../pages/Art';
import AddArt from '../pages/AddArt';

const Root = ({ user, setUser }) => {
  const history = useHistory();

  if (!user && history.location.pathname !== '/signin') {
    history.push('/signin');
  }

  return (
    <Switch>
      <Route path='/signin'>
        <SignIn user={user} setUser={setUser} />
      </Route>
      <Route path='/paintings/add'>
        <AddArt user={user} artType='paintings' />
      </Route>
      <Route path='/paintings/:shortId'>
        <Art user={user} artType='paintings' />
      </Route>
      <Route path='/paintings'>
        <Paintings user={user} />
      </Route>
      <Route path='/papers/add'>
        <AddArt user={user} artType='papers' />
      </Route>
      <Route path='/papers/:shortId'>
        <Art user={user} artType='papers' />
      </Route>
      <Route path='/papers'>
        <Papers user={user} />
      </Route>
      <Route path='/'>
        <Dashboard />
      </Route>
    </Switch>
  );
};

export default Root;
