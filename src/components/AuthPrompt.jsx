import { Link } from 'react-router-dom';

// styles
import './AuthPrompt.css';

export default function AuthPrompt() {
  return (
    <div class="auth-prompt">
      <i class="fa-solid fa-lock"></i>
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
