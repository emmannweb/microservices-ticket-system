import {
  ExchangeNames,
  Producer,
  ExpirationCompleteEvent,
} from "@eftickets/common";

export class ExpirationCompletePublisher extends Producer<ExpirationCompleteEvent> {
  readonly exchangeName = ExchangeNames.ExpirationComplete;
  routingKey = "expirationKeyComplete";
  exchangeType = "direct";
}
