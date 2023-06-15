import '../styles.css';
import { Link, Outlet } from 'react-router-dom';
import React, { useContext } from 'react';
import AppContext from '../components/AppContext.js';


export default function Header(props) {
  const {user, handleSignOut} = useContext(AppContext);
  console.log(props);
  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <span className="nav-item nav-icon">
            <i class="mobile bi bi-list"></i>
            <p class="desktop shop">Shop</p>
          </span>
        </Link>
        <Link to="/about">
          <span className="nav-item nav-icon desktop about">About</span>
        </Link>
        <div>
        {user &&
              <button onClick={handleSignOut}>
                Sign out
              </button>
            }
        {!user &&
        <>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/sign-up">Sign Up</Link>
        </>
        }
        </div>
        <Link to="/cart">
          <span className="nav-item nav-icon">
            <i class="bi bi-bag"></i>
          </span>
        </Link>
        {/* <hr class="top-hr" /> */}
      </div>
      {/* Render the Outlet here. */}
      <Outlet></Outlet>
    </div>
  );
}
