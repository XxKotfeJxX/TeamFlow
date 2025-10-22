// web/src/models/mockDB/calendar.ts
import { seedCalendars, seedEvents, seedTasks } from "./calendar.seed";

export type OwnerType = "user" | "team";

// ===== CALENDAR =====
export interface Calendar {
  id: string;
  name: string;
  ownerType: OwnerType;
  ownerId: string; // userId або teamId
}

// ===== EVENT =====
export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string;
  priority: { team: number; personal: number };
  participants: string[]; // userIds
  calendarId: string;
  ownerId: string; // userId
  recurring: { isRecurring: boolean; periodDays: number };
  status: "active" | "completed";
  tags: string[];
  taskIds?: string[];
}

// ===== TASK =====
export interface Task {
  id: string;
  calendarId: string;
  title: string;
  description?: string;
  color?: string;
  dueDate: Date;
  priority: { team: number; personal: number };
  recurring?: { isRecurring: boolean; periodDays: number };
  assignedUsers?: string[];
  type: "personal" | "team" | "event";
  status: "notStarted" | "inProgress" | "completed";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ===== In-memory бази (початкові seed-и) =====
export const calendars: Calendar[] = [...seedCalendars];
export const events: Event[] = [...seedEvents];
export const tasks: Task[] = [...seedTasks];

// ===== Утиліта для ID =====
const genId = () => crypto.randomUUID();

// =======================================================
// 🔹 CALENDAR DB — збереження у LocalStorage
// =======================================================
const CALENDAR_STORAGE_KEY = "calendarDB";

function saveCalendars() {
  localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(calendars));
}

function loadCalendars() {
  const stored = localStorage.getItem(CALENDAR_STORAGE_KEY);
  if (stored) {
    try {
      const parsed: Calendar[] = JSON.parse(stored);
      calendars.length = 0;
      calendars.push(...parsed);
    } catch (e) {
      console.error("Помилка читання calendarDB:", e);
    }
  } else {
    // якщо в localStorage нічого нема — ініціалізуємо seed-и
    saveCalendars();
  }
}

loadCalendars();

export const calendarDb = {
  create: (data: Omit<Calendar, "id"> & { id?: string }): Calendar => {
    const calendar: Calendar = { id: data.id ?? genId(), ...data };
    calendars.push(calendar);
    saveCalendars();
    return calendar;
  },
  getById: (id: string): Calendar | undefined => calendars.find(c => c.id === id),
  getAll: (): Calendar[] => [...calendars],
  update: (id: string, updates: Partial<Calendar>): Calendar | undefined => {
    const calendar = calendars.find(c => c.id === id);
    if (!calendar) return undefined;
    Object.assign(calendar, updates);
    saveCalendars();
    return calendar;
  },
  delete: (id: string): boolean => {
    const index = calendars.findIndex(c => c.id === id);
    if (index === -1) return false;
    calendars.splice(index, 1);
    saveCalendars();
    return true;
  },
};

// =======================================================
// 🔹 EVENT DB — збереження у LocalStorage
// =======================================================
const EVENT_STORAGE_KEY = "eventDB";

function saveEvents() {
  localStorage.setItem(
    EVENT_STORAGE_KEY,
    JSON.stringify(
      events.map(e => ({
        ...e,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate.toISOString(),
      }))
    )
  );
}

function loadEvents() {
  const stored = localStorage.getItem(EVENT_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Event[];
      events.length = 0;
      events.push(
        ...parsed.map(e => ({
          ...e,
          startDate: new Date(e.startDate),
          endDate: new Date(e.endDate),
        }))
      );
    } catch (e) {
      console.error("Помилка читання eventDB:", e);
    }
  } else {
    saveEvents();
  }
}

loadEvents();

export const eventDb = {
  create: (data: Omit<Event, "id">): Event => {
    const event: Event = { id: genId(), ...data };
    events.push(event);
    saveEvents();
    return event;
  },
  getById: (id: string): Event | undefined => events.find(e => e.id === id),
  getAll: (): Event[] => [...events],
  getByCalendarId: (calendarId: string): Event[] =>
    events.filter(e => e.calendarId === calendarId),
  update: (id: string, updates: Partial<Event>): Event | undefined => {
    const event = events.find(e => e.id === id);
    if (!event) return undefined;
    Object.assign(event, updates);
    saveEvents();
    return event;
  },
  delete: (id: string): boolean => {
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    saveEvents();
    return true;
  },
};

// =======================================================
// 🔹 TASK DB — збереження у LocalStorage (вже було)
// =======================================================
const TASK_STORAGE_KEY = "tasksDB";

function saveTasks() {
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(TASK_STORAGE_KEY);
  if (stored) {
    try {
      const parsed: Task[] = JSON.parse(stored);
      tasks.length = 0;
      tasks.push(
        ...parsed.map(t => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
          dueDate: new Date(t.dueDate),
        }))
      );
    } catch (e) {
      console.error("Помилка читання tasksDB:", e);
    }
  } else {
    saveTasks();
  }
}

loadTasks();

export const taskDb = {
  create: (data: Omit<Task, "id" | "createdAt" | "updatedAt">): Task => {
    const task: Task = {
      id: genId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    tasks.push(task);
    saveTasks();
    return task;
  },
  getById: (id: string): Task | undefined => tasks.find(t => t.id === id),
  getAll: (): Task[] => [...tasks],
  getByCalendarId: (calendarId: string): Task[] =>
    tasks.filter(t => t.calendarId === calendarId),
  update: (id: string, updates: Partial<Task>): Task | undefined => {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;
    Object.assign(task, updates, { updatedAt: new Date() });
    saveTasks();
    return task;
  },
  delete: (id: string): boolean => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    saveTasks();
    return true;
  },
  toggleStatus: (id: string): Task | undefined => {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;
    task.status =
      task.status === "completed" ? "inProgress" : "completed";
    task.updatedAt = new Date();
    saveTasks();
    return task;
  },
};
