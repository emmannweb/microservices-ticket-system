import { Consumer, OrderCreatedEvent, ExchangeNames } from "@eftickets/common";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Consumer<OrderCreatedEvent> {
  readonly exchangeName = ExchangeNames.OrderCreated;
  routingKey = "ordersKeyCreate";
  exchangeType = "direct";
  queueName = "ordersQueueCreate";

  async onMessage(data: OrderCreatedEvent["data"]) {
    // Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // If no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    // Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();
    await new TicketUpdatedPublisher(this.channel).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });
  }
}
