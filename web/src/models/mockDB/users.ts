// db/users.ts

import { seedUsers } from "./users.seed";

export type PlanType = "Base" | "Pro" | "Enterprise";

export interface User {
  id: string;              // унікальний ID
  username: string;        // 🔹 обов'язкове
  fullname?: string;       // опційне (прізвище та ім’я)
  email: string;           // 🔹 обов'язкове
  password: string;        // 🔹 обов'язкове (поки без хешування)
  avatarUrl?: string;        // URL аватарки
  tags: string[];          // масив тегів
  bio?: string;            // "про себе"
  skills: string[];        // масив скілів
  links: string[];         // масив посилань
  languages: string[];     // масив мов
  timezone?: string;       // часовий пояс

  createdAt: Date;         // дата реєстрації
  lastActive: Date;        // остання активність
  interfaceLang: string;   // мова інтерфейсу
  profileVisibility: "public" | "private"; // видимість профілю

  teams: string[];         // масив ID команд
  plan: PlanType;          // тариф
}

// 🗃️ In-memory "таблиця"
export const users: User[] = [...seedUsers];

// Helper для ID
const genId = () => crypto.randomUUID();

users.push(...seedUsers);

// 📌 CRUD API
export const userDb = {
  create: (data: Omit<User, "id" | "createdAt" | "lastActive">): User => {
    const user: User = {
      id: genId(),
      avatarUrl: data.avatarUrl || "",
      ...data,
      createdAt: new Date(),
      lastActive: new Date(),
    };
    users.push(user);
    return user;
  },

  getById: (id: string): User | undefined => users.find(u => u.id === id),
  getByEmail: (email: string): User | undefined => users.find(u => u.email === email),
  getAll: (): User[] => [...users],

  update: (id: string, updates: Partial<User>): User | undefined => {
    const user = users.find(u => u.id === id);
    if (!user) return undefined;
    Object.assign(user, updates, { lastActive: new Date() });
    return user;
  },

  delete: (id: string): boolean => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  }
};
