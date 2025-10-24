import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Price from "./pages/Price";
import ProfilePage from "./pages/ProfilePage";
import MonthPage from "./pages/MonthPage";
import WeekPage from "./pages/WeekPage";
import DayPage from "./pages/DayPage";
import TeamPage from "./pages/TeamPage";
import TasksPage from "./pages/TaskPage";
import UserTeamsPage from "./pages/UserTeamsPage";
import OverviewPage from "./pages/OverviewPage";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import MyTeamPage from "./pages/MyTeamPage";
import CareerPage from "./pages/CareerPage";
import BlogPage from "./pages/BlogPage";
import SupportPage from "./pages/SupportPage";
import DocsPage from "./pages/DocsPage";
import TeamworkPage from "./pages/blog/TeamworkPage";
import CalendarAccessPage from "./pages/blog/CalendarAccessPage";
import GithubIntegrationPage from "./pages/blog/GithubIntegrationPage";
import FocusPage from "./pages/blog/FocusPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DownloadPage from "./pages/DownloadPage";
import ContactPage from "./pages/ContactPage";
import ErrorPage from "./pages/ErrorPage";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

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
        <Route path="/team/:id" element={<TeamPage />} />
        <Route path="/tasks/:ownerType/:ownerId" element={<TasksPage />} />
        <Route path="/teams/user/:userId" element={<UserTeamsPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-team" element={<MyTeamPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/documentation" element={<DocsPage />} />
        <Route path="/blog/teamwork" element={<TeamworkPage />} />
        <Route path="/blog/calendar-access" element={<CalendarAccessPage />} />
        <Route
          path="/blog/github-integration"
          element={<GithubIntegrationPage />}
        />
        <Route path="/blog/focus" element={<FocusPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage code={404} />} />

        {/* Календар */}
        <Route path="/calendar/:calendarId/:month" element={<MonthPage />} />
        <Route
          path="/calendar/:calendarId/week/:weekStart"
          element={<WeekPage />}
        />
        <Route path="/calendar/:calendarId/day/:date" element={<DayPage />} />
      </Routes>
    </Router>
  );
};

export default App;

