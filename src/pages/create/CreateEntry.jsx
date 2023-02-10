import './CreateEntry.css'

export default function CreateEntry() {
  return (
    <main>
      <div className="container">
        <div className="new-entry">
          <div className="form-header">
            <h1>New Entry</h1>
            <button className="btn" id="view-entries-btn">VIEW ENTRIES</button>
          </div>
          <form id="new-entry-form">
          </form>
        </div>
      </div>
    </main>
  )
}