import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { MessagingService } from "@messaging/application/services/messaging.service";
import type { Student } from "@academic/students/domain/models/student.entity";

// ─── Exchanges (criadas por este publicador) ───────────────────────────────
const EXCHANGES = {
  created: "academic.students.created.exchange",
  updated: "academic.students.updated.exchange",
  deleted: "academic.students.deleted.exchange",
} as const;

// ─── Routing keys ──────────────────────────────────────────────────────────
const ROUTING_KEYS = {
  created: "student.created",
  updated: "student.updated",
  deleted: "student.deleted",
} as const;

@Injectable()
export class StudentsPublisher implements OnModuleInit {
  private readonly logger = new Logger(StudentsPublisher.name);

  constructor(private readonly messagingService: MessagingService) {}

  async onModuleInit(): Promise<void> {
    for (const exchange of Object.values(EXCHANGES)) {
      await this.messagingService.assertExchange(exchange);
    }
    this.logger.log("Students exchanges asserted");
  }

  publishCreated(student: Student): void {
    this.messagingService.publish(EXCHANGES.created, ROUTING_KEYS.created, {
      id: student.id,
      name: student.name,
      email: student.email,
      document: student.document,
      registration: student.registration,
    });
  }

  publishUpdated(student: Student): void {
    this.messagingService.publish(EXCHANGES.updated, ROUTING_KEYS.updated, {
      id: student.id,
      name: student.name,
      email: student.email,
      document: student.document,
      registration: student.registration,
    });
  }

  publishDeleted(id: string): void {
    this.messagingService.publish(EXCHANGES.deleted, ROUTING_KEYS.deleted, {
      id,
    });
  }
}