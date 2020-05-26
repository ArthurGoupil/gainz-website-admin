import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from 'axios';

// import Header from './components/Header/Header';
import './styles/App.css';
import Home from './pages/Home';
import SignIn from './pages/SignIn/SignIn';

// import { library } from '@fortawesome/fontawesome-svg-core';
// import {} from '@fortawesome/free-solid-svg-icons';
// import {} from '@fortawesome/free-regular-svg-icons';
// library.add();

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
        {/* <Header user={user} setUser={setUser} /> */}
        <main className='d-flex justify-center'>
          <Switch>
            <Route path='/signin'>
              <SignIn user={user} setUser={setUser} />
            </Route>
            <Route path='/'>
              <Home user={user} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
