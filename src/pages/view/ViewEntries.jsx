import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthPrompt } from '../../components/components';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom'

// components
import ViewEntriesHeader from './ViewEntriesHeader.jsx';
import RenderEntries from './RenderEntries.jsx';
import NoEntries from './NoEntries.jsx'

// styles
import './ViewEntries.css';

// TODO: sort entries by timeCreated

export default function ViewEntries() {
  const { user } = useAuthContext();
  const { entries, pending } = useCollection('entries', ['uid', '==', user && user.uid]);
  
  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="view-entries">
            <ViewEntriesHeader />
            {pending ? 
              <p className="loading">Loading Entries...</p> :
              entries.length ? <RenderEntries entries={entries} /> : <NoEntries />
            }
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
