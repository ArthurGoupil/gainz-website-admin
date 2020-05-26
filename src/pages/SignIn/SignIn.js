import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'js-cookie';

import './SignIn.css';
import Loader from '../../components/Utils/Loader';

const SignIn = ({ user, setUser }) => {
  const history = useHistory();
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
        setErrorMessage('');
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

  return (
    <div className='signin-container d-flex align-center'>
      <div className='d-flex flex-column align-center'>
        <img className='gainz-logo' src='/logo/logo-gainz.svg' alt='' />
        <h1>Admin</h1>
        <form onSubmit={handleSubmit}>
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
            {formIsLoading ? <Loader height='30px' width='30px' /> : 'Valider'}
          </button>
          <div className='errorMessage'>{errorMessage}</div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
