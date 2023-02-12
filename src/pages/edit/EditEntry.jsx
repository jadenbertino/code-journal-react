import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/init';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';

// TODO: trim whitespace from any form controls upon submission
// TODO: redirect back to locked content upon sign in / sign up

/*
  useEffect
    fetch doc
    rip out values
    set state of to those values
  
  imgPreview & form validation stays the same afaik

  onSubmit => updates the doc instead of adding it
*/

// components
import { AuthPrompt } from '../../components/components';

// styles
import '../create/CreateEntry.css'
import './EditEntry.css'

export default function EditEntry() {
  const [entryTitle, setEntryTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [entryNotes, setEntryNotes] = useState('');
  const [isValidNotes, setIsValidNotes] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [isValidImgSrc, setIsValidImgSrc] = useState(true);
  const [previewImgSrc, setPreviewImgSrc] = useState('/placeholder.jpg');
  const { user } = useAuthContext();
  const {id} = useParams()
  const [pending, setPending] = useState(true)

  async function getEntryById(collectionName, id) {
    setPending(true)

    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      setPending(false)
      return
    }
    
    const entry = docSnap.data()
    
    const { title, notes, imgSrc } = entry

    setEntryTitle(title)
    setEntryNotes(notes)
    setImgSrc(imgSrc)
    setPreviewImgSrc(imgSrc)
  }

  useEffect(() => {
    getEntryById('entries', id)
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

  // async function createEntry() {
  //   const newEntry = {
  //     title: entryTitle,
  //     notes: entryNotes,
  //     imgSrc,
  //     uid: user.uid,
  //     timeCreated: serverTimestamp()
  //     // id not necessary because firebase auto assigns it
  //   };
  //   await addDoc(collection(db, 'entries'), newEntry);
  //   resetFields();
  // }

  async function handleSubmit(e) {
    e.preventDefault();
    // check each state
    // if valid => take away red highlight
    // if any are invalid => highlight in red
    // if ALL are valid => createEntry
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

    // if (isValidEntry) await createEntry();
  }

  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="row new-entry" data-view="new-entry">
            <div className="form-header">
              <h1>Edit Entry</h1>
              <Link to="/">
                <button className="btn" id="view-entries-btn">
                  VIEW ENTRIES
                </button>
              </Link>
            </div>
            <form id="new-entry-form" onSubmit={handleSubmit}>
              <div className="col-half img-wrapper">
                <img id="new-entry-img" src={previewImgSrc} alt="placeholder" />
              </div>
              <div className="col-half text-wrapper">
                <label>
                  <span>Title</span>
                  <input
                    type="text"
                    name="title"
                    id="new-entry-title"
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
                    name="photoURL"
                    id="new-entry-photoURL"
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
                  name="notes"
                  id="new-entry-notes"
                  onChange={e => setEntryNotes(e.target.value)}
                  className={isValidNotes ? '' : 'invalid-input'}
                  value={entryNotes}
                  required></textarea>
              </label>
              <div className="btns-wrapper col-full">
                <button className="btn">SAVE EDITS</button>
                <button className="delete-entry-btn hidden" type="button">
                  Delete Entry
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
