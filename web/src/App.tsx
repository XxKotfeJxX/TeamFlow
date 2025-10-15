import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Price from "./pages/Price";
import ProfilePage from "./pages/ProfilePage";
import MonthPage from "./pages/MonthPage";
import WeekPage from "./pages/WeekPage";
import DayPage from "./pages/DayPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Головні сторінки */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/price" element={<Price />} />
        <Route path="/profile/:id" element={<ProfilePage />} />

        {/* Календар */}
        <Route path="/calendar/:calendarId/:month" element={<MonthPage />} />
        <Route path="/calendar/:calendarId/week/:weekStart" element={<WeekPage />} />
        <Route path="/calendar/:calendarId/day/:date" element={<DayPage />} />
      </Routes>
    </Router>
  );
};

export default App;
