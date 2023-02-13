import ReactDOM from 'react-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useLogOut } from '../hooks/useLogOut';

// styles in App.css

export default function NavModal({setModalActive}) {
  const { user } = useAuthContext()
  const { logout } = useLogOut()
  const root = document.querySelector('#root');

  async function handleLogOut() {
    await logout()
    setModalActive(false)
  }

  function handleClick(e) {
    if (e.target.tagName === 'BUTTON') setModalActive(false)
  }
  
  return ReactDOM.createPortal((
    <div className="modal-backdrop">
      <div className="modal nav-modal">
        <div className="modal-content-wrapper" onClick={handleClick}>
          <h2>Menu</h2>
          <Link to="/">
            <button className="btn">View Entries</button>
          </Link>
          <Link to="/create">
            <button className="btn">New Entry</button>
          </Link>
          {user && <button className="btn" id="nav-sign-out-btn"onClick={handleLogOut}>Sign Out</button>}
          {!user && (
            <>
              <Link to="/login">
                <button className="btn">Log In</button>
              </Link>
              <Link to="/signup">
                <button className="btn">Sign Up</button>
              </Link>
            </>
          )}
          <button className="btn btn-sm exit-modal-btn">
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>
    </div>
  ), root);

}


/*
  <div className="modal-backdrop">
    <div className="modal">
      <h3>Are you sure you want to delete this entry?</h3>
      <div className="btns-wrapper">
        <button className="btn cancel-delete-btn" onClick={() => setModalActive(false)}>CANCEL</button>
        <button className="btn confirm-delete-btn" onClick={deleteEntry}>CONFIRM</button>
      </div>
    </div>
  </div>
*/