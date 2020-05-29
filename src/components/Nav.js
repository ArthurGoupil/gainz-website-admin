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
          <div className='icon d-flex justify-center'>
            <FontAwesomeIcon icon='paint-brush' />
          </div>
          Peinture
        </div>
        <div className='paintings-sub-menu'>
          <NavLink to='/paintings/add' activeClassName='selected'>
            <div>Ajouter un tableau</div>
          </NavLink>
          <NavLink to='/paintings' activeClassName='selected' exact>
            <div>Consulter la liste</div>
          </NavLink>
        </div>
        <div
          className='nav-element d-flex align-center'
          onClick={() => {
            setTogglePapersSubMenu(!togglePapersSubMenu);
            setTogglePaintingsSubMenu(false);
          }}
        >
          <div className='icon d-flex justify-center'>
            <FontAwesomeIcon icon='sticky-note' />
          </div>
          Travail sur papier
        </div>
        <div className='papers-sub-menu'>
          <NavLink to='/papers/add' activeClassName='selected'>
            <div>Ajouter un tableau</div>
          </NavLink>
          <NavLink to='/papers' activeClassName='selected' exact>
            <div>Consulter la liste</div>
          </NavLink>
        </div>
      </div>
      <style>
        {`
        .paintings-sub-menu {
          height: ${togglePaintingsSubMenu ? '38px' : '0'};
          overflow: hidden;
          transition: height 0.3s ease;
          font-size: 1.3rem;
          margin: 5px 0 0 40px;
        }
        .papers-sub-menu {
          height: ${togglePapersSubMenu ? '38px' : '0'};
          overflow: hidden;
          transition: height 0.3s ease;
          font-size: 1.3rem;
          margin: 5px 0 0 40px;
        }
        `}
      </style>
    </nav>
  );
};

export default Nav;
