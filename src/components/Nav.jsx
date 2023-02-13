import {useAuthContext} from '../hooks/useAuthContext'
import { Link } from 'react-router-dom';
import { useLogOut } from './../hooks/useLogOut'
import NavModal from './NavModal';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks/useWindowSize';

// styles
import "./Nav.css";

export default function Nav() {
  const { logout } = useLogOut()
  const { user } = useAuthContext()
  const [modalActive, setModalActive] = useState(false)
  const {width: screenWidth} = useWindowSize()

  useEffect(() => {
    if (modalActive && screenWidth > 576) {
      setModalActive(false)
    }
  }, [screenWidth, modalActive])

  return (
    <nav>
      <div className="container">
        <Link to="/" className="title">
          <i className="fa-sharp fa-solid fa-bookmark"></i>
          <h3>Code Journal</h3>
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
            <button className="btn btn-sm sign-out" onClick={logout}>Sign Out</button>
          </>}
        </div>

        {/* MOBILE  ONLY*/}
        <button className="btn mobile-hamburger" onClick={() => setModalActive(true)}>
          <i className="fa-solid fa-bars"></i>
        </button>
        {modalActive && <NavModal setModalActive={setModalActive} />}
      </div>
    </nav>
  );
}
