import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthPrompt } from '../../components/components';
import { useCollection } from '../../hooks/useCollection';

// components
import ViewEntriesHeader from './ViewEntriesHeader.jsx';
import RenderEntries from './RenderEntries.jsx';

// styles
import './ViewEntries.css';
import { useState } from 'react';

export default function ViewEntries() {
  const { user } = useAuthContext();
  const { entries, pending } = useCollection('entries', ['uid', '==', user && user.uid]);
  // const [query, setQuery] = useState('')
  
  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="view-entries">
            <ViewEntriesHeader />
            {pending ? 
              <p className="loading">Loading...</p> :
              entries ?
                <RenderEntries entries={entries} /> :
                <p>No Entries</p>
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
