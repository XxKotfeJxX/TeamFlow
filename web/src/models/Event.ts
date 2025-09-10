// Event.ts
// Основна модель події (Event) для календаря

export type Priority = 'low' | 'medium' | 'high';

export interface EventDTO {
  id: string;
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  color?: string;
  description?: string;
  tags?: string[];
  priority?: Priority;
  microTasks?: MicroTaskDTO[];
  // optional: associated task id, organizer id, attendees etc.
  eventMeta?: Record<string, unknown>;
}

export interface MicroTaskDTO {
  id: string;
  title: string;
  done?: boolean;
}

export class CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  description?: string;
  tags: string[];
  priority: Priority;
  microTasks: MicroTaskDTO[];
  eventMeta: Record<string, unknown>;

  constructor(dto: EventDTO) {
    this.id = dto.id;
    this.title = dto.title;
    this.start = new Date(dto.start);
    this.end = new Date(dto.end);
    if (this.end < this.start) {
      // defensive: normalize end >= start (set end = start + 30min)
      this.end = new Date(this.start.getTime() + 30 * 60 * 1000);
    }
    this.color = dto.color;
    this.description = dto.description || '';
    this.tags = dto.tags || [];
    this.priority = dto.priority || 'medium';
    this.microTasks = dto.microTasks || [];
    this.eventMeta = dto.eventMeta || {};
  }

  durationMs(): number {
    return this.end.getTime() - this.start.getTime();
  }

  durationMinutes(): number {
    return Math.round(this.durationMs() / (60 * 1000));
  }

  overlapsWith(other: CalendarEvent): boolean {
    // Two events overlap if one's start < other's end and one's end > other's start
    return this.start < other.end && this.end > other.start;
  }

  containsMoment(moment: Date): boolean {
    return this.start <= moment && moment < this.end;
  }

  isAllDay(): boolean {
    // heuristic: if event spans >= 20 hours, treat as all-day
    return this.durationMs() >= 20 * 60 * 60 * 1000;
  }

  toDTO(): EventDTO {
    return {
      id: this.id,
      title: this.title,
      start: this.start.toISOString(),
      end: this.end.toISOString(),
      color: this.color,
      description: this.description,
      tags: this.tags,
      priority: this.priority,
      microTasks: this.microTasks,
      eventMeta: this.eventMeta,
    };
  }
}
