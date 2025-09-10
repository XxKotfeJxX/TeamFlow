import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Price from './pages/Price';
import MonthPage from './pages/MonthPage';
import WeekPage from './pages/WeekPage';
import DayPage from './pages/DayPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/price" element={<Price />} />
        <Route path="/month" element={<MonthPage events={[]} onDayClick={(day) => console.log(day)} />} />
        <Route path="/week" element={<WeekPage weekStart={new Date()} events={[]} />} />
        <Route path="/day" element={<DayPage date={new Date()} events={[]} />} />
        {/* Додай інші маршрути тут */}
      </Routes>
    </Router>
  );
}

export default App;