import { seedCalendars, seedEvents, seedTasks } from "./calendar.seed";

export type OwnerType = "user" | "team";

export interface Calendar {
  id: string;
  name: string;
  ownerType: OwnerType;
  ownerId: string; // userId або teamId
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color: string;
  priority: { team: number; personal: number };
  participants: string[]; // userId
  calendarId: string;
  ownerId: string; // userId
  recurring: { isRecurring: boolean; periodDays: number };
  status: "active" | "completed";
  tags: string[];
  taskIds?: string[]; // <-- масив ID тасків, що відносяться до цієї події
}


export interface Task {
  id: string;
  title: string;
  description?: string;
    dueDate: Date;
    color: string;
  priority: { team: number; personal: number };
  recurring: { isRecurring: boolean; periodDays: number };
  assignedUsers: string[];
  type: "personal" | "team" | "event";
  status: "notStarted" | "inProgress" | "completed";
  calendarId?: string;
  tags: string[];
}

// In-memory "таблиці"
export const calendars: Calendar[] = [...seedCalendars];
export const events: Event[] = [...seedEvents];
export const tasks: Task[] = [...seedTasks];

// Helper для генерації ID
const genId = () => crypto.randomUUID();

// 📌 CRUD для календарів
export const calendarDb = {
  create: (data: Omit<Calendar, "id">): Calendar => {
    const calendar: Calendar = { id: genId(), ...data };
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
  }
};

// 📌 CRUD для подій
export const eventDb = {
  create: (data: Omit<Event, "id">): Event => {
    const event: Event = { id: genId(), ...data };
    events.push(event);
    return event;
  },
  getById: (id: string): Event | undefined => events.find(e => e.id === id),
  getAll: (): Event[] => [...events],
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
  }
};

// 📌 CRUD для тасків
export const taskDb = {
  create: (data: Omit<Task, "id">): Task => {
    const task: Task = { id: genId(), ...data };
    tasks.push(task);
    return task;
  },
  getById: (id: string): Task | undefined => tasks.find(t => t.id === id),
  getAll: (): Task[] => [...tasks],
  update: (id: string, updates: Partial<Task>): Task | undefined => {
    const task = tasks.find(t => t.id === id);
    if (!task) return undefined;
    Object.assign(task, updates);
    return task;
  },
  delete: (id: string): boolean => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  }
};
