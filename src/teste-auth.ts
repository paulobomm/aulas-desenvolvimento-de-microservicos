import amqplib from "amqplib";
import { randomUUID } from "crypto";

const RABBITMQ_URL = "amqp://guest:guest@localhost:5672";
const EXCHANGE_NAME = "auth.created.exchange";
const ROUTING_KEY = "user.created";

async function simulateAuthService() {
  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createConfirmChannel();

  // Garante que a exchange existe (o Auth service real faria isso)
  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

  const payload = {
    id: randomUUID(),
    name: "Novo Usuário do Auth",
    email: "authuser@escola.com",
    document: "11122233344",
  };

  console.log("📤 Publicando evento como se fosse o Auth Service...");
  console.log("Payload:", JSON.stringify(payload, null, 2));

  await new Promise<void>((resolve, reject) => {
    channel.publish(
      EXCHANGE_NAME,
      ROUTING_KEY,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true },
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });

  console.log("\n✅ Mensagem confirmada pelo RabbitMQ!");
  
  await channel.close();
  await connection.close();
}

simulateAuthService().catch(console.error);
