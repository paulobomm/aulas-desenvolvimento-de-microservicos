import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { MessagingService } from "@messaging/application/services/messaging.service";
import type { Teacher } from "@academic/teachers/domain/models/teacher.entity";

// ─── Exchanges (criadas por este publicador) ───────────────────────────────
const EXCHANGES = {
  created: "academic.teachers.created.exchange",
  updated: "academic.teachers.updated.exchange",
  deleted: "academic.teachers.deleted.exchange",
} as const;

// ─── Routing keys ──────────────────────────────────────────────────────────
const ROUTING_KEYS = {
  created: "teacher.created",
  updated: "teacher.updated",
  deleted: "teacher.deleted",
} as const;

@Injectable()
export class TeachersPublisher implements OnModuleInit {
  private readonly logger = new Logger(TeachersPublisher.name);

  constructor(private readonly messagingService: MessagingService) {}

  async onModuleInit(): Promise<void> {
    for (const exchange of Object.values(EXCHANGES)) {
      await this.messagingService.assertExchange(exchange);
    }
    this.logger.log("Teachers exchanges asserted");
  }

  async publishCreated(teacher: Teacher): Promise<void> {
    await this.messagingService.publish(EXCHANGES.created, ROUTING_KEYS.created, {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      document: teacher.document,
      degree: teacher.degree,
      specialization: teacher.specialization,
      admissionDate: teacher.admissionDate,
    });
  }

  async publishUpdated(teacher: Teacher): Promise<void> {
    await this.messagingService.publish(EXCHANGES.updated, ROUTING_KEYS.updated, {
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      document: teacher.document,
      degree: teacher.degree,
      specialization: teacher.specialization,
      admissionDate: teacher.admissionDate,
    });
  }

  async publishDeleted(id: string): Promise<void> {
    await this.messagingService.publish(EXCHANGES.deleted, ROUTING_KEYS.deleted, {
      id,
    });
  }
}