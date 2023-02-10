import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import { CreateEntry, EditEntry, ViewEntries } from './pages/pages'

// styles
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewEntries />}/>
        <Route path="/create" element={<CreateEntry />}/>
        <Route path="/edit/:id" element={<EditEntry />}/>
      </Routes>
    </Router>
  );
}

export default App;