import mongoose from "mongoose";
import { app } from "./app";
import { rabbitWrapper } from "./rabbit-wrapper";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";

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

    new TicketCreatedListener(rabbitWrapper.client).consumeMessage();
    new TicketUpdatedListener(rabbitWrapper.client).consumeMessage();
    new ExpirationCompleteListener(rabbitWrapper.client).consumeMessage();
    new PaymentCreatedListener(rabbitWrapper.client).consumeMessage();

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!");
  });
};

start();
