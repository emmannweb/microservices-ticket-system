import {
  OrderCancelledEvent,
  ExchangeNames,
  Consumer,
  OrderStatus,
} from "@eftickets/common";

import { Order } from "../../models/order";

export class OrderCancelledListener extends Consumer<OrderCancelledEvent> {
  readonly exchangeName = ExchangeNames.OrderCancelled;
  routingKey = "ordersKeyCancel";
  exchangeType = "direct";
  queueName = "ordersQueueCancel";

  async onMessage(data: OrderCancelledEvent["data"]) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    //msg.ack();
  }
}
