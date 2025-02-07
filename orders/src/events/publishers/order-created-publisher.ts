import { Producer, OrderCreatedEvent, ExchangeNames } from "@eftickets/common";

export class OrderCreatedPublisher extends Producer<OrderCreatedEvent> {
  readonly exchangeName = ExchangeNames.OrderCreated;
  routingKey = "ordersKeyCreate";
  exchangeType = "direct";
}
