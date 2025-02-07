import { Consumer, TicketCreatedEvent, ExchangeNames } from "@eftickets/common";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Consumer<TicketCreatedEvent> {
  readonly exchangeName = ExchangeNames.TicketCreated;
  routingKey = "ticketsKeyCreate";
  exchangeType = "direct";
  queueName = "ticketsCreateQueue";

  async onMessage(data: TicketCreatedEvent["data"]) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
  }
}
