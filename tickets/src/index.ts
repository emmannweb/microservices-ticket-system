import mongoose from "mongoose";
import { app } from "./app";
import { rabbitWrapper } from "./rabbit-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
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
    new OrderCancelledListener(rabbitWrapper.client).consumeMessage();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

start();
