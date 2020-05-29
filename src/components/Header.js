import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Cookies from 'js-cookie';

import '../styles/Header.css';

const Header = ({ setUser }) => {
  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Dashboard');
        setSubtitle('');
        break;
      case '/paintings':
        setTitle('Peintures');
        setSubtitle('Liste des tableaux');
        break;
      case '/papers':
        setTitle('Travail sur papier');
        setSubtitle('Liste des tableaux');
        break;
      case '/paintings/add':
        setTitle('Peinture');
        setSubtitle('Ajouter un tableau');
        break;
      case '/papers/add':
        setTitle('Travail sur papier');
        setSubtitle('Ajouter un tableau');
        break;
      default:
        setTitle('');
        break;
    }
  }, [location]);

  return (
    <header className='d-flex align-center space-between'>
      <div className='d-flex'>
        <h1 className='title'>{title}</h1>
        <span className='subtitle'>{subtitle}</span>
      </div>
      <span
        className='logout'
        onClick={() => {
          setUser(null);
          Cookies.remove('userToken');
        }}
      >
        Se déconnecter
      </span>
    </header>
  );
};

export default Header;
