import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import { CreateEntry, EditEntry, ViewEntries } from './pages/pages'

// components
import { Nav } from './components/components'

// styles
import './App.css';

function App() {

  // Import Data from local storage on load
  const prevData = localStorage.getItem('dataJSON')
  const data = prevData ? JSON.parse(prevData) : {
    view: 'entry-form',
    entries: [],
    editing: null,
    nextEntryId: 1,
  }

  // Export Data to local storage on exit
  window.addEventListener('beforeunload', () => {
    const dataJSON = JSON.stringify(data)
    localStorage.setItem('dataJSON', dataJSON)
  })
  
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<ViewEntries />}/>
        <Route path="/create" element={<CreateEntry />}/>
        <Route path="/edit/:id" element={<EditEntry />}/>
      </Routes>
    </Router>
  );
}

export default App;