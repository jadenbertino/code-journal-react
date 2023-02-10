import './CreateEntry.css';
import placeholder from './placeholder.jpg';

export default function CreateEntry() {
  return (
    <main>
      <div className="container">
        <div className="new-entry">
          <div className="form-header">
            <h1>New Entry</h1>
            <button className="btn" id="view-entries-btn">
              VIEW ENTRIES
            </button>
          </div>
          <form id="new-entry-form">
            <div className="col-half">
              <img
                id="new-entry-img"
                src={placeholder}
                alt="placeholder image"
              />
            </div>
            <div className="col-half">
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
                  required
                />
              </label>
            </div>
            <label className="col-full">
              <span>Notes</span>
              <textarea name="notes" id="new-entry-notes" required></textarea>
            </label>
            <div class="btns-wrapper col-full">
              <button class="btn">SAVE</button>
              <button class="delete-entry-btn hidden" type="button">
                Delete Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
