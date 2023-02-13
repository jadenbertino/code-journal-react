import { Link } from "react-router-dom"
import { useRef } from "react"
import { useEffect, useState } from "react"

export default function RenderEntries({ entries, searchQuery, resetQuery }) {
  const [queriedEntries, setQueriedEntries] = useState([...entries])
  
  function resetQueriedEntries() {
    setQueriedEntries([...entries].sort((a, b) => b.timeCreated.seconds - a.timeCreated.seconds))
  }

  // triggered on form submit (anytime searchQuery changes)
  useEffect(() => {
    if (searchQuery === '') {
      // empty query => reset
      resetQueriedEntries()
      return
    }
    
    const queryWords = searchQuery.toLowerCase().split(' ')
    setQueriedEntries([...entries].filter(entry => {
      const allEntryWords = `${entry.title + entry.notes}`.toLowerCase()
      for (let word of queryWords) {
        if (allEntryWords.includes(word)) {
          return true
        }
      }
      return false
    }))
  }, [searchQuery])

  return (
    <>
      {queriedEntries.length ? <ul>
        {queriedEntries.map(entry => (<li className="entry" key={entry.id}>
          <div className="img-wrapper">
            <img src={entry.imgSrc} alt="entry-img" />
          </div>
          <div className="text-wrapper">
            <div className="title-wrapper">
              <h3 className="entry-title">{entry.title}</h3>
              <Link to={`/edit/${entry.id}`}>
                <button className="btn pencil">
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </Link>
            </div>
            <p>{entry.notes}</p>
          </div>
        </li>))}
      </ul> : (
        <div className="no-entries">
        <p>{`No entries${entries.length ? " match this query" : ""}`}</p>
        <div className="btns-wrapper">
          {entries.length ? <button className="btn" onClick={resetQuery}>Reset Query</button> : null}
          <Link to="/create">
            <button className="btn">Create New Entry</button>
          </Link>
        </div>
      </div> 
      )}
    </>
  )
}