// web/src/models/mockDB/teams.ts
import { seedTeams } from "./teams.seed";

// ========== TEAM ==========
export interface Team {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  members: string[]; // userIds
  createdAt: Date;
  updatedAt: Date;
}

// In-memory таблиця для команд
export const teams: Team[] = [...seedTeams];

// Helper для генерації ID
const genId = () => crypto.randomUUID();

// CRUD для команд
export const teamDb = {
  create: (data: Omit<Team, "id" | "createdAt" | "updatedAt">): Team => {
    const team: Team = {
      id: genId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    teams.push(team);
    return team;
  },

  getById: (id: string): Team | undefined => teams.find(t => t.id === id),
  getAll: (): Team[] => [...teams],

  update: (id: string, updates: Partial<Team>): Team | undefined => {
    const team = teams.find(t => t.id === id);
    if (!team) return undefined;
    Object.assign(team, updates, { updatedAt: new Date() });
    return team;
  },

  delete: (id: string): boolean => {
    const index = teams.findIndex(t => t.id === id);
    if (index === -1) return false;
    teams.splice(index, 1);
    return true;
  },
};

// ========== TEAM PROFILE (ВІЗИТКА) ==========

// Тип шаблону блоку
export type TeamProfileBlockType =
  | "text_basic"   // текстові блоки
  | "list"         // списки
  | "links"        // посилання
  | "gallery"      // галереї з фото
  | "custom";      // інше (на майбутнє)

// Один блок візитки
export interface TeamProfileBlock {
  id: string;
  teamId: string;          // прив’язка до команди
  templateId: string;      // id шаблону (для визначення структури)
  data: Record<string, unknown>; // будь-який JSON контент (залежно від шаблону)
  orderIndex: number;      // порядок відображення
  createdAt: Date;
  updatedAt: Date;
}

// In-memory таблиця для блоків візитки
export const teamProfiles: TeamProfileBlock[] = [];

// CRUD для блоків візитки
export const teamProfileDb = {
  create: (
    teamId: string,
    templateId: string,
    data: Record<string, unknown>,
    orderIndex?: number
  ): TeamProfileBlock => {
    const block: TeamProfileBlock = {
      id: genId(),
      teamId,
      templateId,
      data,
      orderIndex: orderIndex ?? teamProfiles.length,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    teamProfiles.push(block);
    return block;
  },

  getByTeamId: (teamId: string): TeamProfileBlock[] =>
    teamProfiles
      .filter(b => b.teamId === teamId)
      .sort((a, b) => a.orderIndex - b.orderIndex),

  getById: (id: string): TeamProfileBlock | undefined =>
    teamProfiles.find(b => b.id === id),

  update: (
    id: string,
    updates: Partial<Omit<TeamProfileBlock, "id" | "teamId">>
  ): TeamProfileBlock | undefined => {
    const block = teamProfiles.find(b => b.id === id);
    if (!block) return undefined;
    Object.assign(block, updates, { updatedAt: new Date() });
    return block;
  },

  delete: (id: string): boolean => {
    const index = teamProfiles.findIndex(b => b.id === id);
    if (index === -1) return false;
    teamProfiles.splice(index, 1);
    return true;
  },

  deleteByTeam: (teamId: string): number => {
    const before = teamProfiles.length;
    for (let i = teamProfiles.length - 1; i >= 0; i--) {
      if (teamProfiles[i].teamId === teamId) teamProfiles.splice(i, 1);
    }
    return before - teamProfiles.length;
  },
};
