import {
  Consumer,
  OrderCancelledEvent,
  ExchangeNames,
} from "@eftickets/common";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Consumer<OrderCancelledEvent> {
  readonly exchangeName = ExchangeNames.OrderCancelled;
  routingKey = "ordersKeyCancel";
  exchangeType = "direct";
  queueName = "ordersQueueCancel";

  async onMessage(data: OrderCancelledEvent["data"]) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatedPublisher(this.channel).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
    });
  }
}
