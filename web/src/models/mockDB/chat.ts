export type ChatType = "direct" | "group" | "team";

export interface Chat {
  id: string;
  type: ChatType;
  title?: string;
  avatarUrl?: string;
  teamId?: string;
  participantIds: string[];
  lastReadAtBy: Record<string, Date>;

  createdAt: Date;
  updatedAt: Date;
  lastMessageAt?: Date;
}

export type MessageKind = "text" | "image" | "audio" | "video";

interface BaseMessage {
  id: string;
  chatId: string;
  senderId: string;
  kind: MessageKind;
  createdAt: Date;
  updatedAt: Date;
  status: "sent" | "delivered" | "read";
  replyToId?: string;
  reactions?: Record<string, string[]>;
  deletedAt?: Date;
}

export interface TextMessage extends BaseMessage {
  kind: "text";
  text: string;
}

export interface MediaMeta {
  url: string;
  mimeType?: string;
  sizeBytes?: number;
  durationSec?: number;
  width?: number;
  height?: number;
  thumbnailUrl?: string;
  alt?: string;
}

export interface ImageMessage extends BaseMessage, MediaMeta {
  kind: "image";
}

export interface AudioMessage extends BaseMessage, MediaMeta {
  kind: "audio";
}

export interface VideoMessage extends BaseMessage, MediaMeta {
  kind: "video";
}

export type Message = TextMessage | ImageMessage | AudioMessage | VideoMessage;

export type MessageInput =
  | { kind: "text"; text: string }
  | ({ kind: "image" | "audio" | "video" } & MediaMeta);

const genId = () => crypto.randomUUID();

let chats: Chat[] = [];
let messages: Message[] = [];

const CHATS_KEY = "mock_chats_db_v1";
const MESSAGES_KEY = "mock_chat_messages_db_v1";

function reviveDate(d?: string | Date): Date | undefined {
  if (!d) return undefined;
  return d instanceof Date ? d : new Date(d);
}

function saveChats() {
  const serializable = chats.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
    lastMessageAt: c.lastMessageAt ? c.lastMessageAt.toISOString() : undefined,
    lastReadAtBy: Object.fromEntries(
      Object.entries(c.lastReadAtBy || {}).map(([uid, dt]) => [
        uid,
        (dt as Date).toISOString(),
      ])
    ),
  }));
  localStorage.setItem(CHATS_KEY, JSON.stringify(serializable));
}

function saveMessages() {
  const serializable = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
    deletedAt: m.deletedAt ? m.deletedAt.toISOString() : undefined,
  }));
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(serializable));
}

function loadChats() {
  try {
    const raw = localStorage.getItem(CHATS_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw) as Record<string, unknown>[];

    chats = parsed.map((cRaw): Chat => {
      const c = cRaw as Partial<Chat> & {
        createdAt: string;
        updatedAt: string;
        lastMessageAt?: string;
        lastReadAtBy?: Record<string, string>;
      };

      return {
        ...c,
        createdAt: new Date(c.createdAt),
        updatedAt: new Date(c.updatedAt),
        lastMessageAt: reviveDate(c.lastMessageAt),
        lastReadAtBy: Object.fromEntries(
          Object.entries(c.lastReadAtBy ?? {}).map(([uid, dt]) => [
            uid,
            new Date(dt),
          ])
        ),
      } as Chat;
    });
  } catch (e) {
    console.error("Помилка читання чатів із LocalStorage:", e);
  }
}


function loadMessages() {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw) as { [key: string]: unknown }[];

    messages = parsed.map((m) => ({
      ...m,
      createdAt: new Date(String(m.createdAt)),
      updatedAt: new Date(String(m.updatedAt)),
      deletedAt: reviveDate(m.deletedAt as string | Date | undefined),
    })) as Message[];
  } catch (e) {
    console.error("Помилка читання повідомлень із LocalStorage:", e);
  }
}

loadChats();
loadMessages();

function touchChat(chatId: string, at = new Date()) {
  const chat = chats.find((c) => c.id === chatId);
  if (chat) {
    chat.updatedAt = at;
    chat.lastMessageAt = at;
  }
}

function ensureParticipantsUnique(ids: string[]): string[] {
  return Array.from(new Set(ids.filter(Boolean)));
}

export const chatDb = {
  createDirect: (userA: string, userB: string): Chat => {
    const pair = ensureParticipantsUnique([userA, userB]).sort();
    const existing = chats.find(
      (c) =>
        c.type === "direct" &&
        c.participantIds.slice().sort().join() === pair.join()
    );
    if (existing) return existing;

    const now = new Date();
    const chat: Chat = {
      id: genId(),
      type: "direct",
      participantIds: pair,
      lastReadAtBy: {},
      createdAt: now,
      updatedAt: now,
    };
    chats.push(chat);
    saveChats();
    return chat;
  },

  createGroup: (
    participantIds: string[],
    title?: string,
    avatarUrl?: string
  ): Chat => {
    const now = new Date();
    const chat: Chat = {
      id: genId(),
      type: "group",
      title,
      avatarUrl,
      participantIds: ensureParticipantsUnique(participantIds),
      lastReadAtBy: {},
      createdAt: now,
      updatedAt: now,
    };
    chats.push(chat);
    saveChats();
    return chat;
  },

  createTeam: (teamId: string, participantIds: string[] = []): Chat => {
    const now = new Date();
    const existing = chats.find(
      (c) => c.type === "team" && c.teamId === teamId
    );
    if (existing) return existing;

    const chat: Chat = {
      id: genId(),
      type: "team",
      teamId,
      participantIds: ensureParticipantsUnique(participantIds),
      lastReadAtBy: {},
      createdAt: now,
      updatedAt: now,
    };
    chats.push(chat);
    saveChats();
    return chat;
  },

  getById: (id: string): Chat | undefined => chats.find((c) => c.id === id),
  getAll: (): Chat[] => [...chats],
  getByTeamId: (teamId: string): Chat | undefined =>
    chats.find((c) => c.type === "team" && c.teamId === teamId),
  getForUser: (userId: string): Chat[] =>
    chats.filter((c) => c.participantIds.includes(userId)),

  update: (
    id: string,
    updates: Partial<Omit<Chat, "id" | "createdAt">>
  ): Chat | undefined => {
    const chat = chats.find((c) => c.id === id);
    if (!chat) return undefined;

    // контрольовані поля
    if (updates.participantIds) {
      chat.participantIds = ensureParticipantsUnique(updates.participantIds);
      delete updates.participantIds;
    }

    if (updates.lastReadAtBy) {
      const merged: Record<string, Date> = { ...chat.lastReadAtBy };

      Object.entries(updates.lastReadAtBy).forEach(([uid, dt]) => {
        const revived = reviveDate(dt);
        if (revived) merged[uid] = revived;
      });

      chat.lastReadAtBy = merged;
      delete updates.lastReadAtBy;
    }


    Object.assign(chat, updates);
    chat.updatedAt = new Date();

    saveChats();
    return chat;
  },

  delete: (id: string): boolean => {
    const i = chats.findIndex((c) => c.id === id);
    if (i === -1) return false;
    chats.splice(i, 1);
    messages = messages.filter((m) => m.chatId !== id);
    saveChats();
    saveMessages();
    return true;
  },

  addParticipant: (chatId: string, userId: string): Chat | undefined => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return undefined;
    if (!chat.participantIds.includes(userId)) chat.participantIds.push(userId);
    chat.updatedAt = new Date();
    saveChats();
    return chat;
  },

  removeParticipant: (chatId: string, userId: string): Chat | undefined => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return undefined;
    chat.participantIds = chat.participantIds.filter((id) => id !== userId);
    chat.updatedAt = new Date();
    saveChats();
    return chat;
  },

  markRead: (chatId: string, userId: string, at = new Date()): void => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;
    chat.lastReadAtBy[userId] = at;
    chat.updatedAt = new Date();
    saveChats();
  },
};

export const messageDb = {
  listByChat: (
    chatId: string,
    opts?: { limit?: number; before?: Date; after?: Date }
  ): Message[] => {
    let list = messages
      .filter((m) => m.chatId === chatId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    if (opts?.before)
      list = list.filter((m) => m.createdAt < (opts.before as Date));
    if (opts?.after)
      list = list.filter((m) => m.createdAt > (opts.after as Date));

    if (opts?.limit) list = list.slice(-opts.limit);
    return list.map((m) => ({ ...m }));
  },

  getById: (id: string): Message | undefined =>
    messages.find((m) => m.id === id),
  send: (chatId: string, senderId: string, input: MessageInput): Message => {
    const now = new Date();
      const base: Omit<BaseMessage, "replyToId" | "reactions"> = {
          id: genId(),
          chatId,
          senderId,
          kind: input.kind as MessageKind,
          createdAt: now,
          updatedAt: now,
          status: "sent",
      };

    let msg: Message;
    if (input.kind === "text") {
      msg = { ...base, kind: "text", text: input.text } as TextMessage;
    } else {
      const meta: MediaMeta = {
        url: input.url,
        mimeType: input.mimeType,
        sizeBytes: input.sizeBytes,
        durationSec: input.durationSec,
        width: input.width,
        height: input.height,
        thumbnailUrl: input.thumbnailUrl,
        alt: input.alt,
      };
      if (input.kind === "image")
        msg = { ...base, kind: "image", ...meta } as ImageMessage;
      else if (input.kind === "audio")
        msg = { ...base, kind: "audio", ...meta } as AudioMessage;
      else msg = { ...base, kind: "video", ...meta } as VideoMessage;
    }

    messages.push(msg);
    touchChat(chatId, now);
    saveMessages();
    saveChats();
    return msg;
  },

  update: (id: string, updates: Partial<Message>): Message | undefined => {
    const m = messages.find((x) => x.id === id);
    if (!m) return undefined;
    Object.assign(m, updates);
    m.updatedAt = new Date();
    saveMessages();
    return m;
  },

  toggleReaction: (
    id: string,
    emoji: string,
    userId: string
  ): Message | undefined => {
    const m = messages.find((x) => x.id === id);
    if (!m) return undefined;
    if (!m.reactions) m.reactions = {};
    const arr = m.reactions[emoji] || [];
    const idx = arr.indexOf(userId);
    if (idx === -1) arr.push(userId);
    else arr.splice(idx, 1);
    m.reactions[emoji] = arr;
    m.updatedAt = new Date();
    saveMessages();
    return m;
  },

  softDelete: (id: string): boolean => {
    const m = messages.find((x) => x.id === id);
    if (!m) return false;
    if (!m.deletedAt) m.deletedAt = new Date();
    saveMessages();
    return true;
  },

  hardDelete: (id: string): boolean => {
    const i = messages.findIndex((x) => x.id === id);
    if (i === -1) return false;
    messages.splice(i, 1);
    saveMessages();
    return true;
  },

  deleteByChat: (chatId: string): number => {
    const before = messages.length;
    messages = messages.filter((m) => m.chatId !== chatId);
    saveMessages();
    return before - messages.length;
  },
};

(function ensureSeed() {
  if (chats.length > 0 || messages.length > 0) return;
  const now = new Date();
  const demo = {
    id: genId(),
    type: "group" as ChatType,
    title: "Демочат",
    avatarUrl: "",
    participantIds: ["u1", "u2", "u3"],
    lastReadAtBy: {},
    createdAt: now,
    updatedAt: now,
  } satisfies Chat;
  chats.push(demo);

  const m1: TextMessage = {
    id: genId(),
    chatId: demo.id,
    senderId: "u1",
    kind: "text",
    text: "Ласкаво просимо в чат!",
    createdAt: now,
    updatedAt: now,
    status: "sent",
  };
  messages.push(m1);
  touchChat(demo.id, now);
  saveChats();
  saveMessages();
})();