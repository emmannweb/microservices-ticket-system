import { Producer, TicketCreatedEvent, ExchangeNames } from "@eftickets/common";

export class TicketCreatedPublisher extends Producer<TicketCreatedEvent> {
  readonly exchangeName = ExchangeNames.TicketCreated;
  routingKey = "ticketsKeyCreate";
  exchangeType = "direct";
}
