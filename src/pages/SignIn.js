import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import '../styles/SignIn.css';
import Loader from '../components/Utils/Loader';

const SignIn = ({ user, setUser }) => {
  const history = useHistory();

  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user, history]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        setFormIsLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/users/signin`,
          {
            email,
            password,
          }
        );
        Cookies.set('userToken', response.data.token, { expires: 7 });
        setErrorMessage(null);
        setUser(response.data);
      } catch (e) {
        setErrorMessage('Accès non autorisé.');
        console.error(e.message);
      }
    } else if (!email && !password) {
      setErrorMessage(
        'Alors ma belle faut écrire son mail et son mot de passe !'
      );
    } else if (!email) {
      setErrorMessage('Alors ma belle faut écrire son mail !');
    } else if (!password) {
      setErrorMessage('Alors ma belle faut écrire son mot de passe !');
    }
    setFormIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsReadyToDisplay(true);
    }, 200);
  }, []);

  return (
    <div
      className='signin-container d-flex align-center justify-center'
      style={{
        opacity: isReadyToDisplay ? 1 : 0,
        transition: ' opacity 0.5s',
      }}
    >
      <div className='d-flex flex-column align-center'>
        <img
          className='gainz-logo'
          src='/logo/logo-gainz.svg'
          alt='Logo Gainz'
        />
        <h1 className='signin-title'>Admin</h1>
        <form onSubmit={handleSubmit} className='d-flex flex-column'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Écris ton email...'
            name='email'
            autoComplete='email'
            value={email}
            onChange={handleEmailChange}
          />
          <label htmlFor='password'>Mot de passe</label>
          <input
            type='password'
            placeholder='Et ton mot de passe...'
            name='password'
            autoComplete='password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            className='submit d-flex justify-center align-center'
            type='submit'
          >
            {!formIsLoading ? 'Valider' : <Loader height='30px' width='30px' />}
          </button>
          {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
