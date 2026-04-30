import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { MessagingService } from "@messaging/application/services/messaging.service";

// ─── Exchanges do auth (criadas pelo serviço auth; apenas declaramos aqui
//     para garantir existência antes do bind) ─────────────────────────────
const AUTH_EXCHANGES = {
  created: "auth.created.exchange",
  updated: "auth.updated.exchange",
  deleted: "auth.deleted.exchange",
} as const;

// ─── Filas (criadas por este consumidor) ──────────────────────────────────
const QUEUES = {
  created: "academic-teachers.auth.created.queue",
  updated: "academic-teachers.auth.updated.queue",
  deleted: "academic-teachers.auth.deleted.queue",
} as const;

// ─── Routing keys esperadas das exchanges do auth ─────────────────────────
const ROUTING_KEYS = {
  created: "user.created",
  updated: "user.updated",
  deleted: "user.deleted",
} as const;

export interface AuthUserPayload {
  id: string;
  name?: string;
  email?: string;
  document?: string;
}

@Injectable()
export class TeachersConsumer implements OnModuleInit {
  private readonly logger = new Logger(TeachersConsumer.name);

  constructor(private readonly messagingService: MessagingService) {}

  async onModuleInit(): Promise<void> {
    // Garante que as exchanges do auth existem antes de fazer o bind
    for (const exchange of Object.values(AUTH_EXCHANGES)) {
      await this.messagingService.assertExchange(exchange);
    }

    // Cria as filas e seus bindings com as exchanges do auth
    await this.messagingService.assertQueue(
      QUEUES.created,
      AUTH_EXCHANGES.created,
      ROUTING_KEYS.created,
    );

    await this.messagingService.assertQueue(
      QUEUES.updated,
      AUTH_EXCHANGES.updated,
      ROUTING_KEYS.updated,
    );

    await this.messagingService.assertQueue(
      QUEUES.deleted,
      AUTH_EXCHANGES.deleted,
      ROUTING_KEYS.deleted,
    );

    // Registra os handlers de consumo (push)
    await this.messagingService.consume(QUEUES.created, (payload) =>
      this.handleUserCreated(payload as AuthUserPayload),
    );

    await this.messagingService.consume(QUEUES.updated, (payload) =>
      this.handleUserUpdated(payload as AuthUserPayload),
    );

    await this.messagingService.consume(QUEUES.deleted, (payload) =>
      this.handleUserDeleted(payload as AuthUserPayload),
    );

    this.logger.log("Teachers auth consumers registered");
  }

  private async handleUserCreated(payload: AuthUserPayload): Promise<void> {
    this.logger.log(`User created received: ${payload.id}`);
    // TODO: implementar lógica de sincronização do usuário auth com teacher
    // Exemplo: criar teacher vinculado ao usuário auth criado
  }

  private async handleUserUpdated(payload: AuthUserPayload): Promise<void> {
    this.logger.log(`User updated received: ${payload.id}`);
    // TODO: implementar lógica de atualização do teacher a partir do usuário auth
    // Exemplo: atualizar email/nome do teacher quando o usuário auth for alterado
  }

  private async handleUserDeleted(payload: AuthUserPayload): Promise<void> {
    this.logger.log(`User deleted received: ${payload.id}`);
    // TODO: implementar lógica de remoção/desativação do teacher
    // Exemplo: desativar o teacher quando o usuário auth for removido
  }
}