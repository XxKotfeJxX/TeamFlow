import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Price from './pages/Price';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/price" element={<Price />} />
        {/* Додай інші маршрути тут */}
      </Routes>
    </Router>
  );
}

export default App;