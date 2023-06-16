/* eslint-disable no-unused-vars -- Remove me */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.js';
import AppContext from '../components/AppContext.js';
import '../styles.css';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage = action === 'sign-in' ? 'Log in' : 'Create account';
  return (
    <div>
      <div>
        <header>
          <h2>Account</h2>
          <p className="welcomeMessage">{welcomeMessage}</p>
        </header>
        <div>
          <AuthForm key={action} action={action} onSignIn={handleSignIn} />
        </div>
      </div>
    </div>
  );
}
