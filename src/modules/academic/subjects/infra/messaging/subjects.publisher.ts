import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { MessagingService } from "@messaging/application/services/messaging.service";
import type { Subject } from "@academic/subjects/domain/models/subject.entity";

// ─── Exchanges (criadas por este publicador) ───────────────────────────────
const EXCHANGES = {
  created: "academic.subjects.created.exchange",
  updated: "academic.subjects.updated.exchange",
  deleted: "academic.subjects.deleted.exchange",
} as const;

// ─── Routing keys ──────────────────────────────────────────────────────────
const ROUTING_KEYS = {
  created: "subject.created",
  updated: "subject.updated",
  deleted: "subject.deleted",
} as const;

@Injectable()
export class SubjectsPublisher implements OnModuleInit {
  private readonly logger = new Logger(SubjectsPublisher.name);

  constructor(private readonly messagingService: MessagingService) {}

  async onModuleInit(): Promise<void> {
    for (const exchange of Object.values(EXCHANGES)) {
      await this.messagingService.assertExchange(exchange);
    }
    this.logger.log("Subjects exchanges asserted");
  }

  publishCreated(subject: Subject): void {
    this.messagingService.publish(EXCHANGES.created, ROUTING_KEYS.created, {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      workload: subject.workload,
      description: subject.description,
    });
  }

  publishUpdated(subject: Subject): void {
    this.messagingService.publish(EXCHANGES.updated, ROUTING_KEYS.updated, {
      id: subject.id,
      name: subject.name,
      code: subject.code,
      workload: subject.workload,
      description: subject.description,
    });
  }

  publishDeleted(id: string): void {
    this.messagingService.publish(EXCHANGES.deleted, ROUTING_KEYS.deleted, {
      id,
    });
  }
}