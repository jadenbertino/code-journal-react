import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useEntry } from '../../hooks/useEntry';
import { useNavigate } from 'react-router-dom';

/*
  imgPreview & form validation stays the same afaik

  onSubmit => updates the doc instead of adding it
*/

// components
import { AuthPrompt } from '../../components/components';
import Modal from '../../components/Modal';

// styles
import '../create/CreateEntry.css'

export default function EditEntry() {
  // form controls
  const [entryTitle, setEntryTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [entryNotes, setEntryNotes] = useState('');
  const [isValidNotes, setIsValidNotes] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [isValidImgSrc, setIsValidImgSrc] = useState(true);
  const [previewImgSrc, setPreviewImgSrc] = useState('/placeholder.jpg');

  // logic
  const [modalActive, setModalActive] = useState(false)
  const { user } = useAuthContext();
  const {id} = useParams()
  const { getEntryById } = useEntry()
  const nav = useNavigate()
  const [error, setError] = useState(false)

  // Pre-Populate Form Controls On Mount
  useEffect(() => {
    async function getEntry() {
      const entry = await getEntryById('entries', id)
      if (entry) {
        const { title, notes, imgSrc } = entry
        setEntryTitle(title)
        setEntryNotes(notes)
        setImgSrc(imgSrc)
        setPreviewImgSrc(imgSrc)
      } else {
        console.log('invalid entry id')
      }
    }
    getEntry()
  }, [])

  function loadImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function showPreviewImg(src) {
    setImgSrc(src);
    try {
      const img = await loadImg(src); // throws error if invalid url
      // valid img url => change to it
      setPreviewImgSrc(img.src);
    } catch {
      // invalid img url => default to placeholder value
      setPreviewImgSrc('/placeholder.jpg');
    }
  }

  /*

      FORM SUBMISSION LOGIC

  */

  function resetFields() {
    setEntryNotes('');
    setEntryTitle('');
    setImgSrc('');
    setPreviewImgSrc('/placeholder.jpg');
  }

  // Form Validation Helpers
  function checkIfCharIsAlphanumeric(char) {
    if (typeof char !== 'string') return false;
    if (char >= 0 && char <= 9) return true; // number
    if (char.toLowerCase() !== char.toUpperCase()) return true; // alphabetical
    return false; // not alphanumeric
  }

  function checkIfValidEntryInput(str) {
    // has at least 1 alphanumeric char
    if (typeof str !== 'string') return false;
    return !!str.split('').filter(char => checkIfCharIsAlphanumeric(char))
      .length;
  }

  async function updateEntry() {
    const docRef = doc(db, 'entries', id)
    const newEntry = {
      title: entryTitle,
      notes: entryNotes,
      imgSrc,
      uid: user.uid,
      timeCreated: serverTimestamp()
      // id not necessary because firebase auto assigns it
    };
    await updateDoc(docRef, newEntry)
    resetFields();
    nav('/')
  }

  async function deleteEntry() {
    const docRef = doc(db, 'entries', id)
    await deleteDoc(docRef)
    nav('/')
  }

  async function handleSubmit(e) {
    /*
      check each state
      if valid => take away red highlight
      if any are invalid => highlight in red
      if ALL are valid => createEntry
    */
  
    e.preventDefault();
    let isValidEntry = true;

    // Title
    if (checkIfValidEntryInput(entryTitle)) {
      setIsValidTitle(true);
    } else {
      setIsValidTitle(false);
      isValidEntry = false;
    }

    // Notes
    if (checkIfValidEntryInput(entryNotes)) {
      setIsValidNotes(true);
    } else {
      setIsValidNotes(false);
      isValidEntry = false;
    }

    // Img Src
    if (previewImgSrc !== '/placeholder.jpg') {
      setIsValidImgSrc(true);
    } else {
      setIsValidImgSrc(false);
      isValidEntry = false;
    }

    if (isValidEntry) await updateEntry();
  }
  
  return (<>
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="new-entry">
            <header>
              <h1>Edit Entry</h1>
            </header>
            <form className="card" onSubmit={handleSubmit}>
              <div className="col-half img-wrapper">
                <img src={previewImgSrc} alt="placeholder" />
              </div>
              <div className="col-half text-wrapper">
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    value={entryTitle}
                    onChange={e => setEntryTitle(e.target.value)}
                    className={isValidTitle ? '' : 'invalid-input'}
                    required
                  />
                </label>
                <label>
                  <span>Photo URL</span>
                  <input
                    type="text"
                    onChange={e => showPreviewImg(e.target.value)}
                    value={imgSrc}
                    className={isValidImgSrc ? '' : 'invalid-input'}
                    required
                  />
                </label>
              </div>
              <label className="col-full">
                <span>Notes</span>
                <textarea
                  onChange={e => setEntryNotes(e.target.value)}
                  className={isValidNotes ? '' : 'invalid-input'}
                  value={entryNotes}
                  required></textarea>
              </label>
              <div className="btns-wrapper col-full">
                <div className="save-or-cancel">
                  <button className="btn">SAVE</button>
                  <Link to="/">
                    <button className="btn swap-views-btn">
                      CANCEL
                    </button>
                  </Link>
                </div>
                <button className="delete-entry-btn" type="button" onClick={() => setModalActive(true)}>
                  Delete Entry
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
    {modalActive && (
      <Modal>
        <div className="confirm-delete-modal">
          <h3>Are you sure you want to delete this entry?</h3>
          <div className="btns-wrapper">
            <button className="btn cancel-delete-btn" onClick={() => setModalActive(false)}>CANCEL</button>
            <button className="btn confirm-delete-btn" onClick={deleteEntry}>CONFIRM</button>
          </div>
        </div>
      </Modal>
    )}
  </>);
}
