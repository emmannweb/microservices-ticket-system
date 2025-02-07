import {
  ExchangeNames,
  Producer,
  PaymentCreatedEvent,
} from "@eftickets/common";

export class PaymentCreatedPublisher extends Producer<PaymentCreatedEvent> {
  readonly exchangeName = ExchangeNames.PaymentCreated;
  routingKey = "paymentKeyCreate";
  exchangeType = "direct";
}
