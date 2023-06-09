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
            <li className="nav-item nav-icon">Home</li>
          </Link>
        </div>
      </nav>
      {/* Render the Outlet here. */}
      <Outlet></Outlet>
    </div>
  );
}
