import '../styles.css';
import { Link, Outlet } from 'react-router-dom';

export default function Footer(props) {
  console.log(props);
  return (
    <div>
      <div className="footer">
        <Link to="/About">
          <li className="footer-item">About</li>
        </Link>
        <Link to="/Terms">
          <li className="footer-item">Terms of Service</li>
        </Link>
        <Link to="/Policy">
          <li className="footer-item">Privacy Policy</li>
        </Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
