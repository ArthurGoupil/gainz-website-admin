import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/Nav.css';

const Nav = (props) => {
  const [togglePapersSubMenu, setTogglePapersSubMenu] = useState(false);
  const [togglePaintingsSubMenu, setTogglePaintingsSubMenu] = useState(false);

  return (
    <nav className='d-flex flex-column'>
      <div className='logo-container d-flex justify-center'>
        <img className='gainz-logo' src='/logo/logo-gainz.svg' alt='' />
      </div>
      <div className='d-flex flex-column space-between'>
        <NavLink exact to='/' activeClassName='selected'>
          <div
            className='nav-element dashboard d-flex align-center'
            onClick={() => {
              setTogglePapersSubMenu(false);
              setTogglePaintingsSubMenu(false);
            }}
          >
            <div className='icon d-flex justify-center'>
              <FontAwesomeIcon icon='columns' />
            </div>
            Dashboard
          </div>
        </NavLink>
        <div
          className='nav-element d-flex align-center'
          onClick={() => {
            setTogglePaintingsSubMenu(!togglePaintingsSubMenu);
            setTogglePapersSubMenu(false);
          }}
        >
          <NavLink to='/paintings/' activeClassName='selected'>
            <div className='d-flex'>
              <div className='icon d-flex justify-center'>
                <FontAwesomeIcon icon='paint-brush' />
              </div>
              Peinture
            </div>
          </NavLink>
        </div>

        <div
          className='nav-element d-flex align-center'
          onClick={() => {
            setTogglePapersSubMenu(!togglePapersSubMenu);
            setTogglePaintingsSubMenu(false);
          }}
        >
          <NavLink to='/papers/' activeClassName='selected'>
            <div className='d-flex'>
              <div className='icon d-flex justify-center'>
                <FontAwesomeIcon icon='sticky-note' />
              </div>
              Travail sur papier
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
