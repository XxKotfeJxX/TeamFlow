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

  // 🔹 Дата дедлайну (використовується в DayPage)
  dueDate: Date;

  // 🔹 Пріоритети — тепер обов’язкові
  priority: { team: number; personal: number };

  recurring?: { isRecurring: boolean; periodDays: number };
  assignedUsers?: string[];
  type: "personal" | "team" | "event";
  status: "notStarted" | "inProgress" | "completed";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ===== In-memory бази =====
export const calendars: Calendar[] = [...seedCalendars];
export const events: Event[] = [...seedEvents];
export const tasks: Task[] = [...seedTasks];

// ===== Утиліта для ID =====
const genId = () => crypto.randomUUID();

// ===== CALENDAR DB =====
export const calendarDb = {
  create: (data: Omit<Calendar, "id"> & { id?: string }): Calendar => {
  const calendar: Calendar = { id: data.id ?? genId(), ...data };
  calendars.push(calendar);
  return calendar;
},

  getById: (id: string): Calendar | undefined => calendars.find(c => c.id === id),
  getAll: (): Calendar[] => [...calendars],
  update: (id: string, updates: Partial<Calendar>): Calendar | undefined => {
    const calendar = calendars.find(c => c.id === id);
    if (!calendar) return undefined;
    Object.assign(calendar, updates);
    return calendar;
  },
  delete: (id: string): boolean => {
    const index = calendars.findIndex(c => c.id === id);
    if (index === -1) return false;
    calendars.splice(index, 1);
    return true;
  },
};

// ===== EVENT DB =====
export const eventDb = {
  create: (data: Omit<Event, "id">): Event => {
    const event: Event = { id: genId(), ...data };
    events.push(event);
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
    return event;
  },
  delete: (id: string): boolean => {
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return false;
    events.splice(index, 1);
    return true;
  },
};

// ===== TASK DB =====
export const taskDb = {
  create: (data: Omit<Task, "id" | "createdAt" | "updatedAt">): Task => {
    const task: Task = {
      id: genId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    tasks.push(task);
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
    return task;
  },

  delete: (id: string): boolean => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  toggleStatus: (id: string): Task | undefined => {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;
    task.status =
      task.status === "completed" ? "inProgress" : "completed";
    task.updatedAt = new Date();
    return task;
  },
};
