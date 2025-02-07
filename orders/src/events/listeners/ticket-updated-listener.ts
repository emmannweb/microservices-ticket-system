import { ExchangeNames, Consumer, TicketUpdatedEvent } from "@eftickets/common";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Consumer<TicketUpdatedEvent> {
  readonly exchangeName = ExchangeNames.TicketUpdated;
  routingKey = "ticketsKeyUpdate";
  exchangeType = "direct";
  queueName = "ticketsUpdateQueue";

  async onMessage(data: TicketUpdatedEvent["data"]) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
  }
}
