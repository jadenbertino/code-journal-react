import { useAuthContext } from '../hooks/useAuthContext';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useReferral } from '../hooks/useReferral';

// styles
import './AuthPrompt.css';

// TODO: Redirect back to referral page after login / signup

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
