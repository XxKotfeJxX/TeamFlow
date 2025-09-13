import type { Calendar, Event, Task } from "./calendar";

export const seedCalendars: Calendar[] = [
  {
    id: "c1",
    name: "Особистий календар Андрія",
    ownerType: "user",
    ownerId: "u1",
  },
  {
    id: "c2",
    name: "Особистий календар Марії",
    ownerType: "user",
    ownerId: "u2",
  },
  {
    id: "c3",
    name: "Командний календар TeamFlow Dev",
    ownerType: "team",
    ownerId: "t1",
  },
];

export const seedEvents: Event[] = [
  {
    id: "e1",
    title: "Стратегічна нарада",
    description: "Обговорити план на наступний квартал",
    startDate: new Date("2025-09-14T10:00:00"),
    endDate: new Date("2025-09-14T11:30:00"),
    color: "#FF5733",
    priority: { team: 2, personal: 2 },
    participants: ["u1", "u2"],
    calendarId: "c3",
    ownerId: "u1",
    recurring: { isRecurring: true, periodDays: 7 },
    status: "active",
    tags: ["Meeting"],
  },
];

export const seedTasks: Task[] = [
  {
    id: "t1",
    title: "Зробити прототип дизайну",
    description: "Потрібно до понеділка",
    dueDate: new Date("2025-09-15T18:00:00"),
    priority: { team: 2, personal: 1 },
    recurring: { isRecurring: false, periodDays: 0 },
    assignedUsers: ["u1"],
    type: "personal",
    status: "inProgress",
    calendarId: "c1",
    tags: ["Design", "Frontend"],
  },
];
