import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';

import './styles/App.css';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Nav from './components/Nav';
import Header from './components/Header';
import Paintings from './pages/Paintings';
import Papers from './pages/Papers';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPaintBrush,
  faStickyNote,
  faColumns,
} from '@fortawesome/free-solid-svg-icons';
library.add(faColumns, faPaintBrush, faStickyNote);

const App = (props) => {
  const tokenFromCookie = Cookies.get('userToken');

  let userState;
  if (tokenFromCookie) {
    userState = { token: tokenFromCookie };
  } else {
    userState = null;
  }
  const [user, setUser] = useState(userState);

  return (
    <div>
      <Router>
        <div className='d-flex'>
          {user && <Nav />}
          <div>
            {user && <Header setUser={setUser} />}
            <main className={`${!user ? 'mainSignin' : 'd-flex'}`}>
              <Switch>
                <Route path='/signin'>
                  <SignIn user={user} setUser={setUser} />
                </Route>
                <Route path='/paintings'>
                  <Paintings user={user} />
                </Route>
                <Route path='/papers'>
                  <Papers user={user} />
                </Route>
                <Route path='/'>
                  <Dashboard user={user} />
                </Route>
              </Switch>
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
