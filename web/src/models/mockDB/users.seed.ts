// db/users.seed.ts
import type { User } from "./users";

const now = new Date();

export const seedUsers: User[] = [
  {
    id: "u1",
    username: "andrew",
    fullname: "Андрій Андрусевич",
    email: "andrew@example.com",
    password: "123456",
    avatarUrl: "/public/images/fight.jpg",
    tags: ["frontend", "teamflow", "founder"],
    bio: "Fullstack розробник, люблю TypeScript і C++.",
    skills: ["React", "C++", "Node.js", "PostgreSQL"],
    links: ["https://github.com/andrew", "https://linkedin.com/in/andrew"],
    languages: ["uk", "en"],
    timezone: "Europe/Kyiv",
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 30),
    lastActive: now,
    interfaceLang: "uk",
    profileVisibility: "public",
    teams: [],
    plan: "Base",
  },
  {
    id: "u2",
    username: "maria",
    fullname: "Марія Коваленко",
    email: "maria@example.com",
    password: "qwerty",
    avatarUrl: "/public/images/fight.jpg",
    tags: ["backend", "db"],
    bio: "Back-end інженерка, працюю з високонавантаженими системами.",
    skills: ["C++", "Rust", "PostgreSQL"],
    links: ["https://github.com/maria"],
    languages: ["uk", "pl", "en"],
    timezone: "Europe/Warsaw",
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5),
    lastActive: new Date(now.getTime() - 1000 * 60 * 30),
    interfaceLang: "en",
    profileVisibility: "private",
    teams: ["t1", "t2"],
    plan: "Pro",
  }
];
