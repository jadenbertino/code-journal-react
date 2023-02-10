import { useState } from 'react';

// styles & assets
import './CreateEntry.css';

export default function CreateEntry() {
  const [imgSrc, setImgSrc] = useState('/placeholder.jpg')

  function loadImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
  
  async function changeImgSrc(src) {
    try {
      const img = await loadImg(src) // throws error if invalid url
      // valid img url => change to it
      setImgSrc(img.src)
    } catch {
      // invalid img url => default to placeholder value
      setImgSrc('./placeholder.jpg')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

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
                src={imgSrc}
                alt="placeholder image"
              />
            </div>
            <div className="col-half text-wrapper">
              <label>
                <span>Title</span>
                <input type="text" name="title" id="new-entry-title" required />
              </label>
              <label>
                <span>Photo URL</span>
                <input
                  type="text"
                  name="photoURL"
                  id="new-entry-photoURL"
                  onChange={(e) => changeImgSrc(e.target.value)}
                  required
                />
              </label>
            </div>
            <label className="col-full">
              <span>Notes</span>
              <textarea name="notes" id="new-entry-notes" required></textarea>
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
