// web/src/models/mockDB/teams.seed.ts
import type { Team } from "./teams";

export const seedTeams: Team[] = [
  {
    id: "t1",
    name: "Awesome Team",
    description: "Тестова команда для демо",
    avatarUrl: "",
    members: [
      { userId: "u1", role: "admin" },
      { userId: "u2", role: "member" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "t2",
    name: "Frontend Masters",
    description: "Команда фронтендерів",
    avatarUrl: "",
    members: [
      { userId: "u3", role: "admin" },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
