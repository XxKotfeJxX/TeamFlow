import { seedUsers } from "./users.seed";

export type PlanType = "Base" | "Lite" | "Pro" | "Enterprise";

export interface User {
  id: string; // унікальний ID
  username: string; // 🔹 логін
  fullname?: string; // ім’я та прізвище (опційно)
  email: string; // 🔹 email
  password: string; // 🔹 пароль (поки без хешування)
  avatarUrl?: string; // аватар
  tags: string[];
  bio?: string;
  skills: string[];
  links: string[];
  languages: string[];
  timezone?: string;

  createdAt: Date;
  lastActive: Date;
  interfaceLang: string;
  profileVisibility: "public" | "private";

  teams: string[];
  plan: PlanType;
}

// 🔹 Ключ для LocalStorage
const STORAGE_KEY = "mock_users_db_v1";

// =========================================================
// 💾 Функції збереження та завантаження користувачів
// =========================================================

function saveToStorage(data: User[]): void {
  try {
    const serializable = data.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
      lastActive: u.lastActive.toISOString(),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch (err) {
    console.error("Помилка при збереженні користувачів:", err);
  }
}

function loadFromStorage(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as Partial<User>[];

    return parsed.map((u) => ({
      id: u.id ?? crypto.randomUUID(),
      username: u.username ?? "",
      fullname: u.fullname ?? "",
      email: u.email ?? "",
      password: u.password ?? "",
      avatarUrl: u.avatarUrl ?? "",
      tags: u.tags ?? [],
      bio: u.bio ?? "",
      skills: u.skills ?? [],
      links: u.links ?? [],
      languages: u.languages ?? [],
      timezone: u.timezone ?? "UTC",
      createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
      lastActive: u.lastActive ? new Date(u.lastActive) : new Date(),
      interfaceLang: u.interfaceLang ?? "uk",
      profileVisibility: u.profileVisibility ?? "public",
      teams: u.teams ?? [],
      plan: u.plan ?? "Base",
    }));
  } catch (err) {
    console.error("Помилка при читанні користувачів:", err);
    return [];
  }
}

// =========================================================
// 🗃️ Ініціалізація бази користувачів
// =========================================================

let users: User[] = loadFromStorage();

if (users.length === 0) {
  users = [...seedUsers];
  saveToStorage(users);
}

// =========================================================
// ⚙️ Сервіс керування користувачами (userDb)
// =========================================================

const genId = () => crypto.randomUUID();

export const userDb = {
  // Створення нового користувача
  create: (data: Omit<User, "id" | "createdAt" | "lastActive">): User => {
    const newUser: User = {
      id: genId(),
      ...data,
      avatarUrl: data.avatarUrl || "",
      createdAt: new Date(),
      lastActive: new Date(),
    };
    users.push(newUser);
    saveToStorage(users);
    return newUser;
  },

  // Отримання користувача за ID
  getById: (id: string): User | undefined => users.find((u) => u.id === id),

  // Отримання користувача за email
  getByEmail: (email: string): User | undefined =>
    users.find((u) => u.email === email),

  // Отримання всіх користувачів
  getAll: (): User[] => [...users],

  // Оновлення користувача
  update: (id: string, updates: Partial<User>): User | undefined => {
    const user = users.find((u) => u.id === id);
    if (!user) return undefined;
    Object.assign(user, updates, { lastActive: new Date() });
    saveToStorage(users);
    return user;
  },

  // Видалення користувача
  delete: (id: string): boolean => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    saveToStorage(users);
    return true;
  },
};

// ✅ Додаємо для сумісності зі старими імпортами
export { users };
