import ReactDOM from 'react-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

// styles
import './NavModal.css'

export default function NavModal() {
  const { user } = useAuthContext()

  const root = document.querySelector('#root');

  return ReactDOM.createPortal((
    <div className="modal-backdrop" onClick={() => console.log('clicked')}>
      <div className="modal nav-modal">
        <div className="modal-content-wrapper">
          <h2>Menu</h2>
          <Link>
            <button className="btn">View Entries</button>
          </Link>
          <Link>
            <button className="btn">Create New Entry</button>
          </Link>
          {user && <button className="btn">Sign Out</button>}
          {!user && (<>
            <button className="btn">Log In</button>
            <button className="btn">Sign Out</button>
          </>)}
          <i class="fa-solid fa-x"></i>
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