import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MessagingService } from "@messaging/application/services/messaging.service";
import { RabbitMQService } from "@messaging/infra/rabbitmq/rabbitmq.service";

@Module({
  imports: [ConfigModule],
  providers: [RabbitMQService, MessagingService],
  exports: [RabbitMQService, MessagingService],
})
export class MessagingModule {}