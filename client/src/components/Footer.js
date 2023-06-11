import '../styles.css';
import { Link, Outlet } from 'react-router-dom';

export default function Footer(props) {
  console.log(props);
  return (
    <div>
      <div className="footer">
        <Link to="/About">
          <p className="footer-item">About</p>
        </Link>
        <Link to="/Terms">
          <p className="footer-item">Terms of Service</p>
        </Link>
        <Link to="/Policy">
          <p className="footer-item">Privacy Policy</p>
        </Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
