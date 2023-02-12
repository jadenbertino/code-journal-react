import { useAuthContext } from '../../hooks/useAuthContext';
import { AuthPrompt } from '../../components/components';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// components
import RenderEntries from './RenderEntries.jsx';
import NoEntries from './NoEntries.jsx';

// styles
import './ViewEntries.css';

// TODO: sort entries by timeCreated

export default function ViewEntries() {
  const { user } = useAuthContext();
  const { entries, pending } = useCollection('entries', ['uid', '==', user && user.uid]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInput = useRef()
  const [searchCount, setSearchCount] = useState(0)

  //  if entries exists then sort by most recent
  function resetQuery() {
    return entries && entries.sort((a, b) => b.timeCreated.seconds - a.timeCreated.seconds);
  }

  let queriedEntries = resetQuery()

  // triggered on form submit
  useEffect(() => {
    console.log('query')
    if (searchQuery === '') {
      // empty query => reset
      queriedEntries = resetQuery()
      return
    }
    const queryWords = searchQuery.split(' ')
    queriedEntries = entries.filter(entry => {
      const allEntryWords = entry.title + entry.notes
      for (let word of queryWords) {
        if (allEntryWords.includes(word)) return true
      }
      return false
    })
    console.log(queriedEntries)
  }, [searchQuery, searchCount])

  // enter on search => search queries
  function searchEntries(e) {
    e.preventDefault()
    setSearchQuery(searchInput.current.value)
    setSearchCount(prev => prev + 1)
  }

  //   // queriedEntries = []
  //   // entries.filter(n => false)
  //   // console.log(entries)
  //   return
  //   if (searchQuery === '') {
      
  //   }

  //   // get list of words to sort for
  //   const searchQueryWords = searchQuery.split(' ');

  //   // if a word from searchQuery in entry title or notes then it will pass filter
  //   // const queriedEntries =
  //   //   sortedEntries &&
  //   //   sortedEntries.filter(entry => {
  //   //     const entryWords = entry.title + entry.notes;
  //   //     for (let word of searchQueryWords) {
  //   //       if (entryWords.includes(word)) return true;
  //   //     }
  //   //     return false;
  //   //   });
  //   // console.log(queriedEntries);

  /*
    split search query by space
    iterate through entries
      get words in entry title + notes, mash them all together
      if that string contains any word in search query words then return true
  */

  return (
    <main>
      <div className={`container vh-100 ${!user ? 'fc' : ''}`}>
        {!user && <AuthPrompt />}
        {user && (
          <div className="view-entries">
            <div className="row header">
              <h1>View Entries</h1>
              <Link to="/create">
                <button className="btn" id="new-entry-btn">
                  NEW ENTRY
                </button>
              </Link>
            </div>
            <form className="search" onSubmit={searchEntries}>
              <button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="text"
                placeholder="Search Entries..."
                ref={searchInput}
              />
            </form>
            {pending ? (
              <p className="loading">Loading Entries...</p>
            ) : entries && entries.length ? (
              <RenderEntries entries={queriedEntries} />
            ) : (
              <NoEntries />
            )}
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
