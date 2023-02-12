import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthPrompt } from '../../components/components';
import { useCollection } from '../../hooks/useCollection';
import RenderEntries from './RenderEntries.jsx';

// styles
import './ViewEntries.css';

export default function ViewEntries() {
  const { user } = useAuthContext();
  const { entries } = useCollection('entries', ['uid', '==', user && user.uid]);
  return (
    <>
      {!user && <AuthPrompt />}
      {user && (
        <>
          <div className="view-entries">
            <div className="header">
              <h1>Entries</h1>
              <button className="btn" id="new-entry-btn">
                NEW ENTRY
              </button>
            </div>
            <form className="search-wrapper">
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input type="text" name="searchQuery" placeholder="Search Entries..."/>
            </form>
            {entries && <RenderEntries entries={entries} />}
            {!entries && <p id="no-entries" className="hidden">No Entries</p>}
            <div className="reset-query-btn-wrapper">
              <button className="btn reset-query-btn hidden">View All Entries</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
