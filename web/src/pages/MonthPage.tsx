import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationBar from "../components/calendar/NavigationBar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import { calendarDb, eventDb } from "../models/mockDB/calendar";
import { teamDb } from "../models/mockDB/teams";
import { userDb } from "../models/mockDB/users";
import { motion } from "framer-motion";
import ErrorPage from "./ErrorPage";

const MonthPage: React.FC = () => {
  const navigate = useNavigate();
  const { calendarId, month } = useParams<{
    calendarId: string;
    month: string;
  }>();

  const [calendarExists, setCalendarExists] = useState<boolean | null>(null);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (!calendarId) {
      setCalendarExists(false);
      return;
    }

    const existing = calendarDb.getById(calendarId);
    if (existing) {
      setCalendarExists(true);
      return;
    }

    let ownerType: "user" | "team" = "user";
    let ownerId = "current-user";

    if (teamDb.getById(calendarId)) {
      ownerType = "team";
      ownerId = calendarId;
    } else if (userDb.getById(calendarId)) {
      ownerType = "user";
      ownerId = calendarId;
    } else {
      setCalendarExists(false);
      return;
    }

    calendarDb.create({
      id: calendarId,
      name: `Новий календар ${new Date().toLocaleDateString()}`,
      ownerType,
      ownerId,
    });

    setCalendarExists(true);
  }, [calendarId]);

  useEffect(() => {
    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const [y, m] = month.split("-").map(Number);
      setCurrentDate(new Date(y, m - 1, 1));
    }
  }, [month]);

  const events =
    calendarExists && calendarId
      ? eventDb.getAll().filter((e) => e.calendarId === calendarId)
      : [];

  const navigateToMonth = (date: Date) => {
    const formatted = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    navigate(`/calendar/${calendarId}/${formatted}`);
    setCurrentDate(date);
  };

  const goPrevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    navigateToMonth(d);
  };

  const goNextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    navigateToMonth(d);
  };

  const goToday = () => navigateToMonth(new Date());

  const onDayClick = (day: Date) => {
    const formatted = day.toLocaleDateString("sv-SE");
    navigate(`/calendar/${calendarId}/day/${formatted}`);
  };

  const onWeekClick = (weekStart: Date) => {
    const formatted = weekStart.toLocaleDateString("sv-SE");
    navigate(`/calendar/${calendarId}/week/${formatted}`);
  };

  if (calendarExists === false) {
    return <ErrorPage code={404} />;
  }

  if (!calendarId) {
    return <ErrorPage code={400} />;
  }

  if (calendarExists === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        ⏳ Завантаження календаря...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50 pt-12">
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        </motion.div>

        <main className="relative z-10 flex flex-col pt-[var(--header-height,4rem)] px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavigationBar
              currentDate={currentDate}
              onPrevMonth={goPrevMonth}
              onNextMonth={goNextMonth}
              onToday={goToday}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 mt-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-md hover:shadow-lg transition p-4"
          >
            <CalendarGrid
              currentDate={currentDate}
              events={events}
              onDayClick={onDayClick}
              onWeekClick={onWeekClick}
            />
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MonthPage;
