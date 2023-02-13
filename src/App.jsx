import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

// pages
import { CreateEntry, EditEntry, ViewEntries, SignUp, LogIn, CreateAndEdit } from './pages/pages'

// components
import { Nav } from './components/components'

// styles
import './App.css';

function App() {
  const { authIsReady } = useAuthContext()

  return (
    <Router>
      {authIsReady && <>
        <Nav />
        <Routes>
          <Route path="/" element={<ViewEntries />} />
          <Route path="/create" element={<CreateEntry />} />
          <Route path="/edit/:id" element={<EditEntry />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </>}
    </Router>
  );
}

export default App;