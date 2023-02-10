import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';
import { useLogOut } from './../hooks/useLogOut'

// styles
import "./Nav.css";

export default function Nav() {
  const { logout } = useLogOut()
  const user = useAuthContext()
  console.log(user)

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
          <button className="btn sign-out" onClick={logout}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
}
