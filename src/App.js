import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';

// pages
import { CreateEntry, EditEntry, ViewEntries } from './pages/pages'

// components
import { Nav } from './components/components'

// styles
import './App.css';

function App() {
  
  return (
    <AuthContextProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<ViewEntries />}/>
          <Route path="/create" element={<CreateEntry />}/>
          <Route path="/edit/:id" element={<EditEntry />}/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;