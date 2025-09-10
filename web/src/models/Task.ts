// Task.ts
// Модель мікротаски / таску, яка може бути пов'язана з подією або існувати сама по собі.

export interface TaskDTO {
  id: string;
  title: string;
  done?: boolean;
  deadline?: string | null; // ISO date-time or null
  eventId?: string | null;
  assigneeId?: string | null;
  meta?: Record<string, unknown>;
}

export class Task {
  id: string;
  title: string;
  done: boolean;
  deadline: Date | null;
  eventId: string | null;
  assigneeId: string | null;
  meta: Record<string, unknown>;

  constructor(dto: TaskDTO) {
    this.id = dto.id;
    this.title = dto.title;
    this.done = !!dto.done;
    this.deadline = dto.deadline ? new Date(dto.deadline) : null;
    this.eventId = dto.eventId || null;
    this.assigneeId = dto.assigneeId || null;
    this.meta = dto.meta || {};
  }

  isOverdue(now: Date = new Date()): boolean {
    return !!this.deadline && !this.done && this.deadline.getTime() < now.getTime();
  }

  toggleDone() {
    this.done = !this.done;
  }

  toDTO(): TaskDTO {
    return {
      id: this.id,
      title: this.title,
      done: this.done,
      deadline: this.deadline ? this.deadline.toISOString() : null,
      eventId: this.eventId,
      assigneeId: this.assigneeId,
      meta: this.meta,
    };
  }
}
