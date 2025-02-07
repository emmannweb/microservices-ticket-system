import { Consumer, OrderCreatedEvent, ExchangeNames } from "@eftickets/common";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Consumer<OrderCreatedEvent> {
  readonly exchangeName = ExchangeNames.OrderCreated;
  routingKey = "ordersKeyCreate";
  exchangeType = "direct";
  queueName = "ordersQueueCreate";

  async onMessage(data: OrderCreatedEvent["data"]) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Waiting this many milliseconds to process the job:", delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );
  }
}
