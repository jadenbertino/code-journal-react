import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthPrompt } from '../../components/components';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

// components
import RenderEntries from './RenderEntries.jsx';

// styles
import './ViewEntries.css';

// TODO: try moving the query logic to 
export default function ViewEntries() {
  const { user } = useAuthContext();
  const { entries, pending } = useCollection('entries', ['uid', '==', user && user.uid]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInput = useRef()

  // enter on search => search queries
  function searchEntries(e) {
    e.preventDefault()
    setSearchQuery(searchInput.current.value)
  }

  function resetQuery() {
    setSearchQuery('')
    setSearchQuery('')
  }

  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="view-entries">
            <header>
              <h1>View Entries</h1>
              <Link to="/create">
                <button className="btn swap-views-btn">
                  NEW ENTRY
                </button>
              </Link>
            </header>
            <form className="search" onSubmit={searchEntries}>
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="text"
                placeholder="Search Entries..."
                ref={searchInput}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
            </form>
            {pending && <p className="loading">Loading Entries...</p>}
            {!pending && <RenderEntries entries={entries} resetQuery={resetQuery} searchQuery={searchQuery}/> }
            <div className="reset-query-btn-wrapper">
              <button className="btn reset-query-btn hidden">
                View All Entries
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
