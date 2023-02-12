import { Link } from 'react-router-dom';

export default function ViewEntriesHeader() {
  return (
    <>
      <div className="row header">
        <h1>View Entries</h1>
        <Link to="/create">
          <button className="btn" id="new-entry-btn">
            NEW ENTRY
          </button>
        </Link>
      </div>
      <form className="search">
        <button className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <input type="text" name="searchQuery" placeholder="Search Entries..." />
      </form>
    </>
  );
}
