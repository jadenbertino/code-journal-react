import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthPrompt } from '../../components/components';

// styles
import './CreateEntry.css';

export default function CreateEntry() {
  const [entryTitle, setEntryTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [entryNotes, setEntryNotes] = useState('');
  const [isValidNotes, setIsValidNotes] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [isValidImgSrc, setIsValidImgSrc] = useState(true);
  const [previewImgSrc, setPreviewImgSrc] = useState('/placeholder.jpg');
  const { user } = useAuthContext();
  const nav = useNavigate()

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

  async function createEntry() {
    const newEntry = {
      title: entryTitle.trim(),
      notes: entryNotes.trim(),
      imgSrc: imgSrc.trim(),
      uid: user.uid,
      timeCreated: serverTimestamp()
      // id not necessary because firebase auto assigns it
    };
    await addDoc(collection(db, 'entries'), newEntry);
    resetFields();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    /*
      check each state
      if valid => take away red highlight
      if any are invalid => highlight in red
      if ALL are valid => createEntry
    */
  
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
    
    // If Valid => Submit Entry
    if (isValidEntry) {
      await createEntry();
      nav('/')
    } 
  }

  function resetFields() {
    setEntryNotes('');
    setEntryTitle('');
    setImgSrc('');
    setPreviewImgSrc('/placeholder.jpg');
  }

  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <>
            <header>
              <h1>New Entry</h1>
              <Link to="/">
                <button className="btn swap-views-btn">
                  VIEW ENTRIES
                </button>
              </Link>
            </header>
            <form className="card entry-form" onSubmit={handleSubmit}>
              <div className="col-half img-wrapper">
                <img src={previewImgSrc} alt="placeholder" />
              </div>
              <div className="col-half text-wrapper">
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    onChange={e => setEntryTitle(e.target.value)}
                    value={entryTitle}
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
                <button className="btn">SAVE</button>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
