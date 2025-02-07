import { rabbitWrapper } from "./rabbit-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ client must be defined");
  }

  try {
    await rabbitWrapper.connect(process.env.RABBITMQ_URL);

    rabbitWrapper.client.on("close", () => {
      console.log("RABBITMQ connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => rabbitWrapper.client.close());
    process.on("SIGTERM", () => rabbitWrapper.client.close());

    new OrderCreatedListener(rabbitWrapper.client).consumeMessage();
  } catch (err) {
    console.error(err);
  }
};

start();
