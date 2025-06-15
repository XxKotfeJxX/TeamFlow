import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile/:username " element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;