import '../styles.css';
import { Link, Outlet } from 'react-router-dom';
import { React, useContext } from 'react';
import AppContext from '../components/AppContext';

export default function Header(props) {
  const { user } = useContext(AppContext);
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
        {!user ? (
          <Link to="/sign-in">
            <span className="nav-item nav-icon">
              <i class="bi bi-person"></i>
            </span>
          </Link>
        ) : (
          <Link to="/account">
            <span className="nav-item nav-icon">
              <i class="bi bi-person"></i>
            </span>
          </Link>
        )}
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
