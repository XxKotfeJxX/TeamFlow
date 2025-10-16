// web\src\models/mockDB/teams.seed.ts
import type { Team } from "./teams";

export const seedTeams: Team[] = [
  {
    id: "t1",
    name: "Awesome Team",
    description: "Тестова команда для демо",
    avatarUrl: "",
    members: ["u1", "u2"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "t2",
    name: "Frontend Masters",
    description: "Команда фронтендерів",
    avatarUrl: "",
    members: ["u3"],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];
