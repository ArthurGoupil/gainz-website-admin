import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Cookies from 'js-cookie';

import './styles/App.css';
import Root from './components/Root';
import Nav from './components/Nav';
import Header from './components/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPaintBrush,
  faStickyNote,
  faColumns,
  faArrowLeft,
  faCheck,
  faTrash,
  faTimes,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faColumns,
  faPaintBrush,
  faStickyNote,
  faArrowLeft,
  faCheck,
  faTrash,
  faTimes,
  faExclamation
);

const App = (props) => {
  const [user, setUser] = useState(Cookies.get('userToken'));

  return (
    <div>
      <Router>
        <div className='d-flex'>
          {user && <Nav />}
          <div>
            {user && <Header setUser={setUser} />}
            <main className={`${!user ? 'mainSignin' : 'd-flex'}`}>
              <Root user={user} setUser={setUser} />
            </main>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
