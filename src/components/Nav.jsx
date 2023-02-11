import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';
import { useLogOut } from './../hooks/useLogOut'

// styles
import "./Nav.css";

export default function Nav() {
  const { logout } = useLogOut()
  const {user} = useAuthContext()

  return (
    <nav>
      <div className="container">
        <div className="title">
          <Link to="/">
            <h3>Code Journal</h3>
          </Link>
          <button className="btn">Entries</button>
        </div>
        <div className="auth">
          {!user && (<>
            <Link to="/login">
              <button className="btn log-in">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="btn sign-up">Sign Up</button>
            </Link>
          </>)}
          {user && <>
            <span>Hello, {user.displayName}</span>
            <button className="btn sign-out" onClick={logout}>Sign Out</button>
          </>}
        </div>
      </div>
    </nav>
  );
}
