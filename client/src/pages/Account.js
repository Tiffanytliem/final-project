import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm.js';
import AppContext from '../components/AppContext.js';
import '../styles.css';
import Footer from '../components/Footer';

export default function Account() {
  const { user, handleSignOut } = useContext(AppContext);
  return (
    <div>
      <div className="Account">
        {user && (
          <div>
            <p> Hello! {user.email}</p>
            <p className="actionLink">View Orders</p>
            <br />
            <br />
            <p className="actionLink signout" onClick={handleSignOut}>
              Logout
            </p>
          </div>
        )}
        {!user && (
          <>
            <p>
              Please{' '}
              <Link to="/sign-in" className="actionLink">
                log in
              </Link>{' '}
              to continue or{' '}
              <Link to="/sign-up" className="actionLink">
                create an account
              </Link>
            </p>
          </>
        )}
      </div>
      <div className="row hr-footer no-scroll">
        <Footer />
      </div>
    </div>
  );
}
