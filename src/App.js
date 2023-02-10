import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';

// pages
import { CreateEntry, EditEntry, ViewEntries, SignUp, LogIn } from './pages/pages'

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
          <Route path="/" element={<ViewEntries />} />
          <Route path="/create" element={<CreateEntry />} />
          <Route path="/edit/:id" element={<EditEntry />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;