import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// context
import { DataContextProvider } from './context/DataContext';

// pages
import { CreateEntry, EditEntry, ViewEntries } from './pages/pages'

// components
import { Nav } from './components/components'

// styles
import './App.css';

function App() {
  
  return (
    <DataContextProvider>
      <Router>
        <Nav />
        
        <Routes>
          <Route path="/" element={<ViewEntries />}/>
          <Route path="/create" element={<CreateEntry />}/>
          <Route path="/edit/:id" element={<EditEntry />}/>
        </Routes>
      </Router>
    </DataContextProvider>
  );
}

export default App;