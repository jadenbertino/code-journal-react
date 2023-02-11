import { useEffect, useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from '../../firebase/init'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

// TODO: ensure that user id is getting pushed up with the entry

// styles & assets
import './CreateEntry.css';

export default function CreateEntry() {
  const [entryTitle, setEntryTitle] = useState('')
  const [entryNotes, setEntryNotes] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [previewImgSrc, setPreviewImgSrc] = useState('/placeholder.jpg')
  const { user } = useAuthContext()

  // redirect user if not signed in
  const nav = useNavigate()
  useEffect(() => {
    if (!user) nav("/login")
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
    setImgSrc(src)
    try {
      const img = await loadImg(src) // throws error if invalid url
      // valid img url => change to it
      setPreviewImgSrc(img.src)
    } catch {
      // invalid img url => default to placeholder value
      setPreviewImgSrc('/placeholder.jpg')
    }
  }

  function resetFields() {
    setEntryNotes('')
    setEntryTitle('')
    setImgSrc('')
    setPreviewImgSrc('/placeholder.jpg')
  }

  async function createEntry() {
    const newEntry = {
      title: entryTitle,
      notes: entryNotes,
      imgSrc,
      uid: user.uid
      // id not necessary because firebase auto assigns it
    }
    await addDoc(collection(db, "entries"), newEntry)
    resetFields()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await createEntry()
  }

  return (
    <main>
      <div className="container">
        <div className="row new-entry" data-view="new-entry">
          <div className="form-header">
            <h1>New Entry</h1>
            <button className="btn" id="view-entries-btn">
              VIEW ENTRIES
            </button>
          </div>
          <form id="new-entry-form" onSubmit={handleSubmit}>
            <div className="col-half img-wrapper">
              <img
                id="new-entry-img"
                src={previewImgSrc}
                alt="placeholder"
              />
            </div>
            <div className="col-half text-wrapper">
              <label>
                <span>Title</span>
                <input 
                  type="text"
                  name="title"
                  id="new-entry-title"
                  onChange={(e) => setEntryTitle(e.target.value)}
                  value={entryTitle}
                  required />
              </label>
              <label>
                <span>Photo URL</span>
                <input
                  type="text"
                  name="photoURL"
                  id="new-entry-photoURL"
                  onChange={(e) => showPreviewImg(e.target.value)}
                  value={imgSrc}
                  required
                />
              </label>
            </div>
            <label className="col-full">
              <span>Notes</span>
              <textarea
                name="notes"
                id="new-entry-notes"
                onChange={(e) => setEntryNotes(e.target.value)}
                value={entryNotes}
                required
              ></textarea>
            </label>
            <div className="btns-wrapper col-full">
              <button className="btn">SAVE</button>
              <button className="delete-entry-btn hidden" type="button">
                Delete Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
