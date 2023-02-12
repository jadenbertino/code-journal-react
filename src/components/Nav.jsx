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
        <Link to="/">
          <div className="title">
            <i class="fa-sharp fa-solid fa-bookmark"></i>
            <h3>Code Journal</h3>
          </div>
        </Link>
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
            <span className="greeting">Hello, {user.displayName}</span>
            <button className="btn sign-out" onClick={logout}>Sign Out</button>
          </>}
        </div>
      </div>
    </nav>
  );
}
