// web\src\models/mockDB/teams.seed.ts
import type { Team } from "./teams";

export const seedTeams: Team[] = [
  {
    id: "t1",
    name: "Awesome Team",
    description: "Тестова команда для демо",
    avatarUrl: "",
    members: ["user-1", "user-2"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "t2",
    name: "Frontend Masters",
    description: "Команда фронтендерів",
    avatarUrl: "",
    members: ["user-3"],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
