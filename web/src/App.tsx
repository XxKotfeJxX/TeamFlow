import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css";
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Price from './pages/Price';
import MonthPage from './pages/MonthPage';
import WeekPage from './pages/WeekPage';
import DayPage from './pages/DayPage';
import { CalendarEvent } from './models/Event';

// Обгортка для навігації з useNavigate
const AppWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleDayClick = (day: Date) => {
    navigate(`/day/${day.toISOString()}`);
  };

  const handleWeekClick = (weekStart: Date) => {
    navigate(`/week/${weekStart.toISOString()}`);
  };

  const dummyEvents: CalendarEvent[] = []; // Тестові події, заміниш на свої

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/price" element={<Price />} />

      {/* Календар */}
      <Route
        path="/month"
        element={
          <MonthPage
            events={dummyEvents}
            onDayClick={handleDayClick}
            onWeekClick={handleWeekClick}
          />
        }
      />
      <Route path="/week/:date" element={<WeekPage events={dummyEvents} />} />
      <Route path="/day/:date" element={<DayPage events={dummyEvents} />} />

      {/* fallback */}
      <Route
        path="*"
        element={
          <MonthPage
            events={dummyEvents}
            onDayClick={handleDayClick}
            onWeekClick={handleWeekClick}
          />
        }
      />
    </Routes>
  );
};

// Головний App
const App: React.FC = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
