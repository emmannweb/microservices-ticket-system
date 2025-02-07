import {
  Consumer,
  ExchangeNames,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@eftickets/common";

import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Consumer<ExpirationCompleteEvent> {
  readonly exchangeName = ExchangeNames.ExpirationComplete;
  routingKey = "expirationKeyComplete";
  exchangeType = "direct";
  queueName = "expirationQueueComplete";

  async onMessage(data: ExpirationCompleteEvent["data"]) {
    const order = await Order.findById(data.orderId).populate("ticket");

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status === OrderStatus.Complete) {
      // return msg.ack();
      return;
    }

    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();
    await new OrderCancelledPublisher(this.channel).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
  }
}
