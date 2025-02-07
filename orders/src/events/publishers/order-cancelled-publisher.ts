import {
  ExchangeNames,
  Producer,
  OrderCancelledEvent,
} from "@eftickets/common";

export class OrderCancelledPublisher extends Producer<OrderCancelledEvent> {
  readonly exchangeName = ExchangeNames.OrderCancelled;
  routingKey = "ordersKeyCancel";
  exchangeType = "direct";
}
