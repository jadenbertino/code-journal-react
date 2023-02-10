import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';

// styles
import "./Nav.css";

export default function Nav() {
  return (
    <nav>
      <div className="container">
        <div className="title">
          <h3>Code Journal</h3>
          <button className="btn">Entries</button>
        </div>
        <div className="auth">
          <Link to="/signup">
            <button className="btn sign-up">Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="btn log-in">Log In</button>
          </Link>
          <button className="btn sign-out">Sign Out</button>
        </div>
      </div>
    </nav>
  );
}
