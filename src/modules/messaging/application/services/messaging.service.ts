import { Injectable, Logger } from "@nestjs/common";
import { RabbitMQService } from "@messaging/infra/rabbitmq/rabbitmq.service";

@Injectable()
export class MessagingService {
  private readonly logger = new Logger(MessagingService.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async assertExchange(name: string, type = "direct"): Promise<void> {
    const channel = this.rabbitMQService.getChannel();
    await channel.assertExchange(name, type, { durable: true });
    this.logger.debug(`Exchange asserted: ${name}`);
  }

  async assertQueue(
    queueName: string,
    exchangeName: string,
    routingKey: string,
  ): Promise<void> {
    const channel = this.rabbitMQService.getChannel();
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, routingKey);
    this.logger.debug(
      `Queue asserted and bound: ${queueName} → ${exchangeName} [${routingKey}]`,
    );
  }

  async publish(exchangeName: string, routingKey: string, payload: object): Promise<void> {
    const channel = this.rabbitMQService.getChannel();
    
    return new Promise((resolve, reject) => {
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
        { persistent: true },
        (err) => {
          if (err) {
            this.logger.error(`Message failed to publish to exchange "${exchangeName}": ${err.message}`);
            reject(err);
          } else {
            this.logger.debug(
              `Message confirmed by RabbitMQ on exchange "${exchangeName}" with key "${routingKey}"`,
            );
            resolve();
          }
        }
      );
    });
  }

  async consume(
    queueName: string,
    handler: (payload: unknown) => Promise<void>,
  ): Promise<void> {
    const channel = this.rabbitMQService.getChannel();

    await channel.consume(queueName, async (msg) => {
      if (!msg) return;

      try {
        const payload = JSON.parse(msg.content.toString());
        await handler(payload);
        channel.ack(msg);
      } catch (error) {
        this.logger.error(
          `Error processing message from queue "${queueName}"`,
          error,
        );
        // requeue: false — evita loop infinito em mensagens inválidas
        channel.nack(msg, false, false);
      }
    });

    this.logger.log(`Consumer registered for queue: ${queueName}`);
  }
}