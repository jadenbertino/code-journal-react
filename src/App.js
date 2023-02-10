import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import { CreateEntry, EditEntry, ViewEntries } from './pages/pages'

// components
import { Nav } from './components/components'

// styles
import './App.css';

function App() {
  
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