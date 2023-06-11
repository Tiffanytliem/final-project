import '../styles.css';
import { Link, Outlet } from 'react-router-dom';

export default function Footer(props) {
  console.log(props);
  return (
    <div className="footer-container">
      <div className="footer">
        <Link to="/About" className="footer-item">
          <p>About</p>
        </Link>
        <Link to="/Terms" className="footer-item">
          <p>Terms of Service</p>
        </Link>
        <Link to="/Policy" className="footer-item">
          <p>Privacy Policy</p>
        </Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
