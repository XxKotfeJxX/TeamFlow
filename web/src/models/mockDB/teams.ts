// web/src/models/mockDB/teams.ts
import { seedTeams } from "./teams.seed";

// ===== TEAM ROLES =====
export type TeamRole = "admin" | "member";

export interface TeamMember {
  userId: string;
  role: TeamRole;
}

// ========== TEAM ==========
export interface Team {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  members: TeamMember[]; // userIds + role
  createdAt: Date;
  updatedAt: Date;
}

// In-memory таблиця для команд
export const teams: Team[] = [...seedTeams];

// Helper для генерації ID
const genId = () => crypto.randomUUID();

// ===== Внутрішні утиліти роботи з учасниками =====
const upsertMember = (team: Team, userId: string, role: TeamRole = "member") => {
  const exists = team.members.find(m => m.userId === userId);
  if (exists) {
    exists.role = role;
  } else {
    team.members.push({ userId, role });
  }
  team.updatedAt = new Date();
};

const removeMemberById = (team: Team, userId: string) => {
  const before = team.members.length;
  team.members = team.members.filter(m => m.userId !== userId);
  if (before !== team.members.length) team.updatedAt = new Date();
};

const ensureHasAdmin = (team: Team) => {
  if (!team.members.some(m => m.role === "admin")) {
    // якщо немає жодного адміна — перетворимо першого учасника на адміна (якщо він є)
    if (team.members[0]) {
      team.members[0].role = "admin";
      team.updatedAt = new Date();
    }
  }
};

// CRUD для команд + керування учасниками
export const teamDb = {
  // data.members тепер очікує TeamMember[]
  create: (data: Omit<Team, "id" | "createdAt" | "updatedAt">): Team => {
    const team: Team = {
      id: genId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    };
    ensureHasAdmin(team);
    teams.push(team);
    return team;
  },

  getById: (id: string): Team | undefined => teams.find(t => t.id === id),
  getAll: (): Team[] => [...teams],

  update: (id: string, updates: Partial<Team>): Team | undefined => {
    const team = teams.find(t => t.id === id);
    if (!team) return undefined;

    // Якщо приходять members — переконаємось, що це масив TeamMember
    if (updates.members) {
      team.members = updates.members.map(m => ({
        userId: m.userId,
        role: m.role ?? "member",
      }));
      ensureHasAdmin(team);
      delete updates.members;
    }

    Object.assign(team, updates, { updatedAt: new Date() });
    return team;
  },

  delete: (id: string): boolean => {
    const index = teams.findIndex(t => t.id === id);
    if (index === -1) return false;
    teams.splice(index, 1);
    return true;
  },

  // ===== ОПЕРАЦІЇ З УЧАСНИКАМИ =====
  addMember: (teamId: string, userId: string, role: TeamRole = "member"): Team | undefined => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return undefined;
    upsertMember(team, userId, role);
    ensureHasAdmin(team);
    return team;
  },

  setRole: (teamId: string, userId: string, role: TeamRole): Team | undefined => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return undefined;
    upsertMember(team, userId, role);
    ensureHasAdmin(team);
    return team;
  },

  removeMember: (teamId: string, userId: string): Team | undefined => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return undefined;
    removeMemberById(team, userId);
    ensureHasAdmin(team);
    return team;
  },

  getMemberRole: (teamId: string, userId: string): TeamRole | undefined => {
    const team = teams.find(t => t.id === teamId);
    const m = team?.members.find(x => x.userId === userId);
    return m?.role;
  },
};



// ===== LocalStorage persistence =====
const STORAGE_KEY = "teamsDB";

function saveTeams() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teams));
}

function loadTeams() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  try {
    const parsed: Team[] = JSON.parse(stored);
    teams.length = 0;
    teams.push(...parsed.map(t => ({
      ...t,
      createdAt: new Date(t.createdAt),
      updatedAt: new Date(t.updatedAt),
    })));
  } catch (e) {
    console.error("Помилка завантаження команд із LocalStorage:", e);
  }
}

// Автоматичне завантаження при старті
loadTeams();

// Перезапис збереження у CRUD методах
const originalCreate = teamDb.create;
teamDb.create = (data) => {
  const newTeam = originalCreate(data);
  saveTeams();
  return newTeam;
};

const originalUpdate = teamDb.update;
teamDb.update = (id, updates) => {
  const updated = originalUpdate(id, updates);
  if (updated) saveTeams();
  return updated;
};

const originalDelete = teamDb.delete;
teamDb.delete = (id) => {
  const ok = originalDelete(id);
  if (ok) saveTeams();
  return ok;
};

teamDb.addMember = (teamId, userId, role) => {
  const t = teams.find(x => x.id === teamId);
  if (!t) return;
  const result = teamDb.setRole(teamId, userId, role ?? "member");
  saveTeams();
  return result;
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
