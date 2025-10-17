import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavigationBar from "../components/calendar/NavigationBar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import { calendarDb, eventDb } from "../models/mockDB/calendar";

const MonthPage: React.FC = () => {
  const navigate = useNavigate();
  const { calendarId, month } = useParams<{ calendarId: string; month: string }>();

  // =========================
  // 🔹 1. Перевіряємо/створюємо календар
  // =========================
  const [calendarExists, setCalendarExists] = useState(false);

  useEffect(() => {
    if (!calendarId) return;

    const existing = calendarDb.getById(calendarId);
    if (existing) {
      setCalendarExists(true);
    } else {
      // створюємо новий календар у базі
      calendarDb.create({
        id: calendarId,
        name: `Новий календар ${new Date().toLocaleDateString()}`,
        ownerType: "user",
        ownerId: "current-user", // або currentUserId з localStorage
      });
      setCalendarExists(true);
    }
  }, [calendarId]);

  // =========================
  // 🔹 2. Ініціалізація дати
  // =========================
  const initialDate = (() => {
    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const [y, m] = month.split("-").map(Number);
      return new Date(y, m - 1, 1);
    }
    return new Date();
  })();

  const [currentDate, setCurrentDate] = useState(initialDate);

  // =========================
  // 🔹 3. Події для цього календаря
  // =========================
  const events = eventDb.getAll().filter((e) => e.calendarId === calendarId);

  // =========================
  // 🔹 4. Навігація
  // =========================
  const navigateToMonth = (date: Date) => {
    const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
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

  // =========================
  // 🔹 5. Навігація між сторінками
  // =========================
  const onDayClick = (day: Date) => {
    const formatted = day.toLocaleDateString("sv-SE");
    navigate(`/calendar/${calendarId}/day/${formatted}`);
  };

  const onWeekClick = (weekStart: Date) => {
    const formatted = weekStart.toLocaleDateString("sv-SE");
    navigate(`/calendar/${calendarId}/week/${formatted}`);
  };

  if (!calendarId) return <div>❌ Не вказано календар</div>;
  if (!calendarExists) return <div className="text-center mt-20 text-gray-600">⏳ Завантаження календаря...</div>;

  // =========================
  // 🔹 6. Рендер
  // =========================
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 p-4 flex flex-col pt-[var(--header-height,4rem)]">
        <NavigationBar
          currentDate={currentDate}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
          onToday={goToday}
        />

        <div className="flex-1 overflow-auto">
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            onDayClick={onDayClick}
            onWeekClick={onWeekClick}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MonthPage;
