import '../styles.css';
import { Link, Outlet } from 'react-router-dom';

export default function Footer(props) {
  console.log(props);
  return (
    <footer className="footer-container">
      <div className="footer">
        <Link to="/about" className="footer-item">
          <p>About</p>
        </Link>
        <Link to="/terms" className="footer-item">
          <p>Terms of Service</p>
        </Link>
        <Link to="/policy" className="footer-item">
          <p>Privacy Policy</p>
        </Link>
      </div>
      <Outlet></Outlet>
    </footer>
  );
}
