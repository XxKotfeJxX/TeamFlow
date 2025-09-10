// Event.ts
// Основна модель події (Event) для календаря

export type Priority = 'low' | 'medium' | 'high';

export interface MicroTaskDTO {
  id: string;
  title: string;
  done?: boolean;
}

export interface EventDTO {
  id: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  color?: string;
  description?: string;
  tags?: string[];
  priority?: Priority;
  microTasks?: MicroTaskDTO[];
  eventMeta?: Record<string, unknown>;
}

/**
 * Клас для роботи з подією у фронті (зручний для UI)
 */
export class CalendarEvent {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  color?: string;
  description: string;
  tags: string[];
  priority: Priority;
  microTasks: MicroTaskDTO[];
  eventMeta: Record<string, unknown>;

  constructor(dto: EventDTO) {
    this.id = dto.id;
    this.title = dto.title;
    this.startTime = new Date(dto.start);
    this.endTime = new Date(dto.end);

    if (this.endTime < this.startTime) {
      this.endTime = new Date(this.startTime.getTime() + 30 * 60 * 1000);
    }

    this.color = dto.color;
    this.description = dto.description || '';
    this.tags = dto.tags || [];
    this.priority = dto.priority || 'medium';
    this.microTasks = dto.microTasks || [];
    this.eventMeta = dto.eventMeta || {};
  }

  durationMs(): number {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  durationMinutes(): number {
    return Math.round(this.durationMs() / (60 * 1000));
  }

  overlapsWith(other: CalendarEvent): boolean {
    return this.startTime < other.endTime && this.endTime > other.startTime;
  }

  containsMoment(moment: Date): boolean {
    return this.startTime <= moment && moment < this.endTime;
  }

  isAllDay(): boolean {
    return this.durationMs() >= 20 * 60 * 60 * 1000;
  }

  toDTO(): EventDTO {
    return {
      id: this.id,
      title: this.title,
      start: this.startTime.toISOString(),
      end: this.endTime.toISOString(),
      color: this.color,
      description: this.description,
      tags: this.tags,
      priority: this.priority,
      microTasks: this.microTasks,
      eventMeta: this.eventMeta,
    };
  }
}
