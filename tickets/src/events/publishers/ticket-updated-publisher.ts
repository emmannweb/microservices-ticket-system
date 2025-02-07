import { Producer, ExchangeNames, TicketUpdatedEvent } from "@eftickets/common";

export class TicketUpdatedPublisher extends Producer<TicketUpdatedEvent> {
  readonly exchangeName = ExchangeNames.TicketUpdated;
  routingKey = "ticketsKeyUpdate";
  exchangeType = "direct";
}
