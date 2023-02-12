import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';

// styles
import './AuthPrompt.css';

// TODO: Redirect back to referral page after login / signup,
// will probably require I switch to dispatch system

export default function AuthPrompt() {

  return (
    <div className="auth-prompt">
      <i className="fa-solid fa-lock"></i>
      <h1>Please sign in to access this content</h1>
      <div className="btns-wrapper">
        <Link to="/login">
          <button className="btn">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}
