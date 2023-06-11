import '../styles.css';
import { Link, Outlet } from 'react-router-dom';

export default function Header(props) {
  console.log(props);
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-collapse">
          {/*<Link className='title' to='/about'>
              {/* TODO: Make these links to About and Catalog, with className "title" */}
          {/*<li className="nav-item nav-link">About</li>
            </Link>*/}

          <Link to="/">
            <span className="nav-item nav-icon">
              <i class="bi bi-list"></i>
            </span>
          </Link>
          <Link to="/account">
            <span className="nav-item nav-icon">
              <i class="bi bi-person"></i>
            </span>
          </Link>
          <Link to="/cart">
            <span className="nav-item nav-icon">
              <i class="bi bi-bag"></i>
            </span>
          </Link>
        </div>
        <hr class="top-hr" />
      </nav>
      {/* Render the Outlet here. */}
      <Outlet></Outlet>
    </div>
  );
}
