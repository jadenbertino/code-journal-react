import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthPrompt } from '../../components/components';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom'
import { useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('')
  
  // sort by most recent
  const sortedEntries = entries && entries.sort((a,b) => b.timeCreated.seconds - a.timeCreated.seconds)
  console.log(searchQuery)
  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="view-entries">
            <ViewEntriesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {pending ? 
              <p className="loading">Loading Entries...</p> :
              entries.length ? <RenderEntries entries={sortedEntries} /> : <NoEntries />
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
